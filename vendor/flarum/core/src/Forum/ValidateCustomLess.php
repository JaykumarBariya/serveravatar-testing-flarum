<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Forum;

use Flarum\Foundation\ValidationException;
use Flarum\Frontend\Assets;
use Flarum\Locale\LocaleManager;
use Flarum\Settings\Event\Saved;
use Flarum\Settings\Event\Saving;
use Flarum\Settings\OverrideSettingsRepository;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Container\Container;
use Illuminate\Filesystem\FilesystemAdapter;
use League\Flysystem\Filesystem;
use League\Flysystem\InMemory\InMemoryFilesystemAdapter;
use Less_Exception_Parser;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * @internal
 */
class ValidateCustomLess
{
    public function __construct(
        protected Assets $assets,
        protected LocaleManager $locales,
        protected Container $container,
        protected SettingsRepositoryInterface $settings,
        protected array $customLessSettings = [],
    ) {
    }

    public function whenSettingsSaving(Saving $event): void
    {
        if (! isset($event->settings['custom_less']) && ! $this->hasDirtyCustomLessSettings($event)) {
            return;
        }

        // Restrict what features can be used in custom LESS
        if (isset($event->settings['custom_less']) && preg_match('/@import|data-uri\s*\(/i', $event->settings['custom_less'])) {
            $translator = $this->container->make(TranslatorInterface::class);

            throw new ValidationException([
                'custom_less' => $translator->trans('core.admin.appearance.custom_styles_cannot_use_less_features')
            ]);
        }

        // We haven't saved the settings yet, but we want to trial a full
        // recompile of the CSS to see if this custom LESS will break
        // anything. In order to do that, we will temporarily override the
        // settings repository with the new settings so that the recompile
        // is effective. We will also use a dummy filesystem so that nothing
        // is actually written yet.

        $settings = $this->container->make(SettingsRepositoryInterface::class);

        $this->container->extend(
            SettingsRepositoryInterface::class,
            function ($settings) use ($event) {
                return new OverrideSettingsRepository($settings, $event->settings);
            }
        );

        $assetsDir = $this->assets->getAssetsDir();

        $adapter = new InMemoryFilesystemAdapter();
        $this->assets->setAssetsDir(new FilesystemAdapter(new Filesystem($adapter), $adapter));

        $this->settings->delete('custom_less_error');

        try {
            $this->assets->makeCss()->commit();

            foreach ($this->locales->getLocales() as $locale => $name) {
                $this->assets->makeLocaleCss($locale)->commit();
            }
        } catch (Less_Exception_Parser $e) {
            throw new ValidationException(['custom_less' => $e->getMessage()]);
        }

        if (! empty($this->settings->get('custom_less_error'))) {
            throw new ValidationException(['custom_less' => $this->settings->get('custom_less_error')]);
        }

        $this->assets->setAssetsDir($assetsDir);
        $this->container->instance(SettingsRepositoryInterface::class, $settings);
    }

    public function whenSettingsSaved(Saved $event): void
    {
        if (! isset($event->settings['custom_less']) && ! $this->hasDirtyCustomLessSettings($event)) {
            return;
        }

        $this->assets->makeCss()->flush();

        foreach ($this->locales->getLocales() as $locale => $name) {
            $this->assets->makeLocaleCss($locale)->flush();
        }
    }

    protected function hasDirtyCustomLessSettings(Saved|Saving $event): bool
    {
        if (empty($this->customLessSettings)) {
            return false;
        }

        $dirtySettings = array_intersect(
            array_keys($event->settings),
            array_map(function ($setting) {
                return $setting['key'];
            }, $this->customLessSettings)
        );

        return ! empty($dirtySettings);
    }
}

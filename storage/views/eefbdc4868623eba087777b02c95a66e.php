<!doctype html>
<html <?php if($direction): ?> dir="<?php echo e($direction); ?>" <?php endif; ?> <?php if($language): ?> lang="<?php echo e($language); ?>" <?php endif; ?> class="<?php echo \Illuminate\Support\Arr::toCssClasses($extraClasses); ?>" <?php echo $extraAttributes; ?>>
    <head>
        <meta charset="utf-8">
        <title><?php echo e($title); ?></title>

        <?php echo $head; ?>

    </head>

    <body>
        <?php echo $layout; ?>


        <div id="modal"></div>
        <div id="alerts"></div>

        <script>
            document.getElementById('flarum-loading').style.display = 'block';
            var flarum = {extensions: {}, debug: <?php echo \Illuminate\Support\Js::from($debug)->toHtml() ?>};
        </script>

        <?php echo $js; ?>


        <script id="flarum-rev-manifest" type="application/json"><?php echo json_encode($revisions, 15, 512) ?></script>

        <script id="flarum-json-payload" type="application/json"><?php echo json_encode($payload, 15, 512) ?></script>

        <script>
            const data = JSON.parse(document.getElementById('flarum-json-payload').textContent);
            document.getElementById('flarum-loading').style.display = 'none';

            try {
                app.load(data);
                app.bootExtensions(flarum.extensions);
                app.boot();
            } catch (e) {
                var error = document.getElementById('flarum-loading-error');
                error.innerHTML += document.getElementById('flarum-content').textContent;
                error.style.display = 'block';
                throw e;
            }
        </script>

        <?php echo $foot; ?>

    </body>
</html>
<?php /**PATH /var/www/html/flarum/vendor/flarum/core/src/Frontend/../../views/frontend/app.blade.php ENDPATH**/ ?>
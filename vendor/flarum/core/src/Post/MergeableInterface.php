<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Post;

/**
 * A post that has the ability to be merged into an adjacent post.
 *
 * This is only implemented by certain types of posts. For example,
 * if a "discussion renamed" post is posted immediately after another
 * "discussion renamed" post, then the new one will be merged into the old one.
 */
interface MergeableInterface
{
    /**
     * Save the model, given that it is going to appear immediately after the
     * passed model.
     *
     * @return static The model resulting after the merge. If the merge is
     *     unsuccessful, this should be the current model instance. Otherwise,
     *     it should be the model that was merged into.
     */
    public function saveAfter(?Post $previous = null): static;
}

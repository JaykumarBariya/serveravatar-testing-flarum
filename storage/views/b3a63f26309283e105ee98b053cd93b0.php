<?php $__env->startSection('content'); ?>
  <p>
    <?php echo e($message); ?>

  </p>
  <p>
    <a href="<?php echo e($url->to('forum')->base()); ?>">
      <?php echo e($translator->trans('core.views.error.not_found_return_link', ['forum' => $settings->get('forum_title')])); ?>

    </a>
  </p>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('flarum.forum::layouts.basic', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH /var/www/html/flarum/vendor/flarum/core/src/Forum/../../views/error/not_found.blade.php ENDPATH**/ ?>
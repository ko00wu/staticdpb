jQuery(document).ready(function($) {
    // 在这个函数内使用 $ 表示 jQuery
    $ = window.jQuery;

    // 你的其他 JavaScript 代码
    $('.cus-loop-add-to-cart').click(function(){
        $this = $(this);
        // $addBtn = $this.closest('.cus-loop-btn-container').siblings('.product-element-top').find('.wd-add-btn a')
        // $addBtn.click();
        const currentProductUrl = $this.data('url');
		window.open(currentProductUrl, '_self');
    });

});
$(document).ready(function(){

    var newImageZIndex = 1 ; // To make sure newly-loaded images land on top of images on the table
    var loaded = false ; //防止 initPhotos() 執行兩次   
    var imageBeingRotated = false ;
    var mouseStartAngle = false ; //旋轉開始前鼠標相對於圖片中心的角度
    var imageStartAngle = false ; //旋轉開始前圖片的旋轉角度

    //控制放開滑鼠右鍵時停止轉動
    $(document).mouseup( stopRotate );

    $('.burn').each( function(index){

        // 替圖片設定隨機的位子跟角度
        var angle= Math.floor( Math.random() * 60 - 30 );
        $(this).css( 'transform' , 'rotate(' + angle + 'deg)');
        $(this).css( '-moz-transform' , 'rotate(0' + angle + 'deg)' );
        $(this).css( '-webkit-transform', 'rotate(' + angle + 'deg)' );
        $(this).css( '-o-transform', 'rotate(' + angle + 'deg)' );
        $(this).data( 'currentRotate', angle * Math.PI/180 ); //弧度=pi*角度/180

        
    } )
})
$(document).ready(function(){
	var imageBeingRotated = false;  
	var mouseStartAngle = false;  //在旋轉前鼠標和圖片中心的相對位置
  var imageStartAngle = false;  //在旋轉前圖片的旋轉角度
  var judge = 0 ;
  var larged = 0 ;
  var midd   = 0 ;
  var smalld = 0 ;

  $(initCircles);

function initCircles(){
    //控制放開滑鼠右鍵時將停止轉動
    $(document).mouseup(stopRotate);
    //處理每個圖片旋轉時的狀態
	$(".burn").each(	function(index){
	//隨機擺放每個圖片的角度
	
		var angle = Math.floor( Math.random() * 360  );
    
		$(this).css( 'transform', 'rotate(' + angle + 'deg)' );   
		$(this).css( '-moz-transform', 'rotate(' + angle + 'deg)' );   
		$(this).css( '-webkit-transform', 'rotate(' + angle + 'deg)' );
		$(this).css( '-o-transform', 'rotate(' + angle + 'deg)' );
		$(this).data('currentRotation', angle * Math.PI / 180 );//弧度=pi*角度/180

		//讓圖片開始旋轉
		$(this).mousedown( startRotate );
	
	});
};

function startRotate( e ) {

 
  // 指定要旋轉的圖片
  imageBeingRotated = this;

  if( this.id === 'large' ){ judge = 1;}
  if( this.id === 'mid' ){judge = 2;}
  if( this.id === 'small' ){judge = 3;}

  // 在旋轉前儲存鼠標相對圖片中心的角度
  var imageCenter = getImageCenter( imageBeingRotated );
  var mouseStartXFromCenter = e.pageX - imageCenter[0];
  var mouseStartYFromCenter = e.pageY - imageCenter[1];
  mouseStartAngle = Math.atan2( mouseStartYFromCenter, mouseStartXFromCenter );

  // 儲存圖片當前的旋轉角度
  imageStartAngle = $(imageBeingRotated).data('currentRotation');

  // 設定當鼠標移動時就旋轉圖像
  $(document).mousemove( rotateImage );

  if( (larged != 0) && (midd != 0) && (smalld != 0)){
    if( ((Math.abs(larged - midd) >= 6.25) || (Math.abs(larged - midd) <= 0.2)) && 
        ((Math.abs(larged - smalld) <= 0.2) || (Math.abs(larged - smalld) >= 6.25)) && 
        ((Math.abs(midd - smalld) <= 0.2) || (Math.abs(midd - smalld) >= 6.25))){
      $(".back").animate({opacity: '0'});
      $(".burn").animate({opacity: '0'});
      setTimeout("document.location.href='file:///home/chia/Desktop/uidd2018/hw2/hw2_2/turn.html'",3000);
      judge=100;
    }
  }
  console.log(Math.abs(larged - midd));
	// 阻止其他會影響到此事件的事件發生
  return false;
}

function stopRotate( e ) {
    //確認是否是正在旋轉的狀態，如果否就return
  if ( !imageBeingRotated ) return;

  // 解除mousemove的功能
  $(document).unbind( 'mousemove' );

  // 取消選取要旋轉的圖片
  imageBeingRotated = false;
  return false;
}
function rotateImage( e ) {

  // 確認是否是正在旋轉的狀態，如果否就return
  if ( !imageBeingRotated ) return;

  // 在旋轉後儲存鼠標相對圖片中心的角度
  var imageCenter = getImageCenter( imageBeingRotated );
  var mouseXFromCenter = e.pageX - imageCenter[0];
  var mouseYFromCenter = e.pageY - imageCenter[1];
  var mouseAngle = Math.atan2( mouseYFromCenter, mouseXFromCenter );

  // 計算圖片要旋轉到幾度的位置
  var rotateAngle = mouseAngle - mouseStartAngle + imageStartAngle;
  
  if( judge == 1 ){larged = rotateAngle ;}
  if( judge == 2 ){midd = rotateAngle ;}
  if( judge == 3 ){smalld = rotateAngle ;}

  // 旋轉圖片到新的角度並儲存新的角度
  $(imageBeingRotated).css('transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).css('-moz-transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).css('-webkit-transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).css('-o-transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).data('currentRotation', rotateAngle );
  
  return false;
}
function getImageCenter( image ) {

  // 先旋轉圖片成正的
  $(image).css('transform','rotate(0rad)');
  $(image).css('-moz-transform','rotate(0rad)');
  $(image).css('-webkit-transform','rotate(0rad)');
  $(image).css('-o-transform','rotate(0rad)');

  // 計算圖片中心
  var imageOffset = $(image).offset(); //offset()可以得到圖片左上方角角的座標
  var imageCenterX = imageOffset.left + $(image).width() / 2;
  var imageCenterY = imageOffset.top + $(image).height() / 2;

  // 旋轉圖片到原本的角度
  var currentRotation = $(image).data('currentRotation');
  $(imageBeingRotated).css('transform','rotate(' + currentRotation + 'rad)');
  $(imageBeingRotated).css('-moz-transform','rotate(' + currentRotation + 'rad)');
  $(imageBeingRotated).css('-webkit-transform','rotate(' + currentRotation + 'rad)');
  $(imageBeingRotated).css('-o-transform','rotate(' + currentRotation + 'rad)');

  // Return 圖片中的的座標
  return Array( imageCenterX, imageCenterY );
}
});
$(document).ready(function(){
    
    $("#btm1").hover(function(){
        $("#btm1").animate( {fontSize:'60px',opacity: '1'} );
        $("#btm2").animate( {fontSize:'30px',opacity: '0.4'} );
        $("#btm3").animate( {fontSize:'30px',opacity: '0.4'} );
        $("#btm4").animate( {fontSize:'30px',opacity: '0.4'} );
    });

    $("#btm2").hover(function(){
        $("#btm1").animate( {fontSize:'30px',opacity: '0.4'} );
        $("#btm2").animate( {fontSize:'60px',opacity: '1'});
        $("#btm3").animate( {fontSize:'30px',opacity: '0.4'});
        $("#btm4").animate( {fontSize:'30px',opacity: '0.4'});
    });

    $("#btm3").hover(function(){
        $("#btm1").animate( {fontSize:'30px',opacity: '0.4'});
        $("#btm2").animate( {fontSize:'30px',opacity: '0.4'});
        $("#btm3").animate( {fontSize:'50px',opacity: '1'} );
        $("#btm4").animate( {fontSize:'30px',opacity: '0.4'} );
    });

    $("#btm4").hover(function(){
        $("#btm1").animate( {fontSize:'30px',opacity: '0.4'} );
        $("#btm2").animate( {fontSize:'30px',opacity: '0.4'} );
        $("#btm3").animate( {fontSize:'30px',opacity: '0.4'} );
        $("#btm4").animate( {fontSize:'50px',opacity: '1'} );
    });

    $("#btm1").click(function(){
        
    })

});
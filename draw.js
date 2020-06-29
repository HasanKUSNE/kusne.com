window.onload = function()
{
    var canvas = document.getElementById('mon_canvas');
        if(!canvas)
        {
            alert("Impossible de récupérer le canvas");
            return;
        }

    var context = canvas.getContext('2d');
        if(!context)
        {
            alert("Impossible de récupérer le context du canvas");
            return;
        }


    //C'est ici que l'on placera tout le code servant à nos dessins.
    //On n'oublie pas de récupérer le canvas et son context.


    // Triangle
    // context.beginPath();//On démarre un nouveau tracé
    // context.moveTo(0, 300);//On se déplace au coin inférieur gauche
    // context.lineTo(150, 0);
    // context.lineTo(300, 300);
    // context.lineTo(0, 300);
    // context.stroke();//On trace seulement les lignes.
    // context.closePath();


    //Rectangle
    context.fillRect(400, 400, 50, 50);

    //Rectangle
    context.strokeRect(300, 400, 50, 50);

    //Le cercle
    context.beginPath(); //On démarre un nouveau tracé.
    context.arc(150, 150, 100, 0, Math.PI*2); //On trace la courbe délimitant notre forme
    //context.fill(); //On utilise la méthode fill(); si l'on veut une forme pleine
    context.stroke();
    context.closePath();

    // Ligne
    context.beginPath();//On démarre un nouveau tracé
    context.moveTo(150, 150);//On se déplace au coin inférieur gauche
    var sin = (Math.sin(1));     
    var cos = Math.cos(1)+220; 
    
    this.console.log("sin : " + sin )
    this.console.log("cos : " + cos )

    context.lineTo(250,150);
    context.stroke();//On trace seulement les lignes.
    context.closePath();

    //-------------------------------------------

    // context.beginPath();//On démarre un nouveau tracé
    // context.moveTo(150, 150);//On se déplace au coin inférieur gauche
    // var sin = Math.sin(0.5)+220;     
    // var cos = Math.cos(0.5)+220; 
    
    // this.console.log("sin : " + sin )
    // this.console.log("cos : " + cos )

    // context.lineTo(sin,cos);
    // context.stroke();//On trace seulement les lignes.
    // context.closePath();

}
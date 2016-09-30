$(document).ready(function(){
    $("#input").click(function(){
            performSearch();
            });
    });
    
/*function handleCarousel(){
    $("#myCarousel").carousel({interval: false});

    $("#myCarousel").on(slide, function(html){jQuery('#itunes-results').html(html)});

}*/

function paginateResults(){


}

function performSearch(){

    var terms = jQuery('#search-keyword').val()

    $.ajax({
    "url": "https://itunes.apple.com/search?",
    "type": "GET",
    "dataType": "JSONP",
    "data": {"term": terms },
    "success": function(data) {handleTunesSearchResults(data)}
    })
}


function handleTunesSearchResults(data) {
    var results = data.results;
    var html = '<h2>Results</h2>';



$.each(results, function(i, value){

    var item = results[i];
    var object = {  
                    artworkUrl100: item.artworkUrl100,
                    track_name: item.trackCensoredName,
                    track_id: item.trackId,
                    previewUrl: item.previewUrl,
                    track_url: item.trackViewUrl,
                    trackPrice: item.trackPrice,
                    artist_name: item.artistName,
                    artist_url: item.artistViewUrl,
                    collection_name: item.collectionCensoredName,
                    collection_url: item.collectionViewUrl,
                    genre: item.primaryGenreName
                    };


    html +='<tr>'
    html += '<td rowspan="2"><img class="img-responsive" src="{0}"></td>'.replace("{0}", object.artworkUrl100);
    html += '<td>{0}</td>'.replace("{0}", object.track_name);                     
    html += '<td><span class="label">Artist: </span><a href="{0}" target="_blank">{1}</a></td>'.replace("{0}", object.artist_url).replace("{1}", object.artist_name);
    html += '<td><a href="{0}" target="_blank">Buy Song</a></td>'.replace("{0}", object.track_url);

        if (object.trackPrice < 0){ html += '<td align="right">N/A</td>';}
        else {html += '<td><span class="label">Track Price: </span>${0} </td>'.replace("{0}", object.trackPrice)}    

    html +='</tr><tr><td><a href="{0}" target="_blank">Preview</a></td>'.replace("{0}", object.previewUrl);
    html += '<td><span class="label">Collection:</span><a href="{0}" target="_blank">{1}</a></td>'.replace("{0}", object.collection_url).replace("{1}", object.collection_name);

        if (item.collectionPrice < 0){ html += '<td align="right">N/A</td>';}
        else {html += '<td><span class="label">Collection Price: </span>${0}</td>'.replace("{0}", item.collectionPrice);}    
    
    html += '<td><span class="label">Primary Genre:</span>{0}</td></tr><br>'.replace("{0}", object.genre);
      

    
    /*LOAD CAROUSEL WITH THIS OBJECT or CALL SOME FUNCTION TO DO IT*/
    
    /*WAIT?? FOR SLIDE EVENT
    BACK TO BEGINNING OF LOOP*/

    })


jQuery('#itunes-results').html(html)

}
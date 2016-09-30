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
    var html = '';



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


    html += '<div class="search-photos">';
    html += '<img src="{0}" target="_blank" style="float:left;">'.replace("{0}", object.artworkUrl100);
    html += '</div>';

    jQuery('#itunes-photo').html(html);

    html = '';

    html += '<div class="songs-search-result">';
    html += '<span class="label">Track:</span>{0}&nbsp;&nbsp;'.replace("{0}", object.track_name);
    html += '<a href="{0}" target="_blank">Preview</a>&nbsp;&nbsp;'.replace("{0}", object.previewUrl);
    html += '<a href="{0}" target="_blank">Full Song</a>&nbsp;&nbsp;'.replace("{0}", object.track_url);
    
    if (object.trackPrice < 0){ html += '<span class="label">Track Price:</span>unavailavle<br />';}
    else {html += '<span class="label">Track Price:</span>{0} {1}<br />'.replace("{0}", object.trackPrice).replace("{1}", item.currency);}                            
    
    html += '<span class="label">Artist:</span><a href="{0}" target="_blank">{1}</a><br />'.replace("{0}", object.artist_url).replace("{1}", object.artist_name);
    html += '<span class="label">Collection:</span><a href="{0}" target="_blank">{1}</a><br />'.replace("{0}", object.collection_url).replace("{1}", object.collection_name);
    html += '<span class="label">Collection Price:</span>{0} {1}<br />'.replace("{0}", item.collectionPrice).replace("{1}", item.currency);
    html += '<span class="label">Primary Genre:</span>{0}<br />'.replace("{0}", object.genre);
    html += '</div>';
    

    /*LOAD CAROUSEL WITH THIS OBJECT or CALL SOME FUNCTION TO DO IT*/
    jQuery('#itunes-results').html(html)
    /*WAIT?? FOR SLIDE EVENT
    BACK TO BEGINNING OF LOOP*/


    })
}
let _tag_input_suggestions_data = null;

/*
create a chainnable method for the script to
*/
$.fn.tagsValues = function (method /*, args*/) {
    //loop through all tags getting the attribute value
    var data=[];
    $(this).find(".data .tag .text").each(function (key,value) {
        let v=$(value).attr('_value');
        data.push(v);
    })

    return data;
};


/*
Handle click of the input area
 */
$('.tags-input').click(function () {
    $(this).find('input').focus();

});

//click tags list
$(document).on('click','#tags_list', function() {
    var list_tags = $(this).text();
    console.log('list_tags:', list_tags);

    let template="<span class=\"tag\"><span class=\"text\" _value='"+list_tags+"'>"+list_tags+"</span><span class=\"close\">&times;</span></span>\n";
    $('.data').append(template);
    $('.autocomplete-items-test').html('');
});




/*
handle the click of close button on the tags
 */

$(document).on("click", ".tags-input .data .tag .close", function() {
    // whatever you do to delete this row
    $(this).parent().remove()


})

/*
Handle the click of one suggestion
*/

$(document).on("click", ".tags-input .autocomplete-items div", function() {
    let index=$(this).index()
    let data=_tag_input_suggestions_data[index];
    let data_holder = $(this).parents().eq(4).find('.data')
    _add_input_tag(data_holder,data.id,data.name)
    console.log(data.name);
    //$('.tags-input .autocomplete-items').html('');

})

/*
detect enter on the input
 */
var stack_highlight = 0;
var stack_highlight_max = 0;
var old_query_key = "";

$(".tags-input input").on( "keydown", function(event) {
    if(event.which == 13){
        
        if(stack_highlight == 0){
            if(_tag_input_suggestions_data != null & stack_highlight == 0){
                $.getJSON("./skills_feed/skills_feed.php?skill="+ _tag_input_suggestions_data[0].name, function(x_data) {
                    console.log("have skill :", x_data[0].name);
    
                    let template="<span class=\"tag\"><span class=\"text\" _value='"+x_data[0].name+"'>"+x_data[0].name+"</span><span class=\"close\">&times;</span></span>\n";
                    $('.data').append(template);
    
                });
            }
        }else{
            if(_tag_input_suggestions_data != null & stack_highlight > 0){
                $.getJSON("./skills_feed/skills_feed.php?skill="+ _tag_input_suggestions_data[stack_highlight].name, function(x_data) {
                    let template="<span class=\"tag\"><span class=\"text\" _value='"+_tag_input_suggestions_data[stack_highlight].name+"'>"+_tag_input_suggestions_data[stack_highlight].name+"</span><span class=\"close\">&times;</span></span>\n";
                    $('.data').append(template);
                });
            }
        }

        if(stack_highlight == -1){
            var name_shot_1 = _tag_input_suggestions_data[0].name
            $.getJSON("./skills_feed/skills_feed.php?skill="+ name_shot_1, function(x_data) {
                let template="<span class=\"tag\"><span class=\"text\" _value='"+name_shot_1+"'>"+name_shot_1+"</span><span class=\"close\">&times;</span></span>\n";
                $('.data').append(template);
            });
        }

        console.log(_tag_input_suggestions_data[0].name);




        if(skills_list.find(element => element == query_key)){
            console.log('have');
            let data = $(this).val()
            if(data!="")_add_input_tag(this,data,data)
            console.log(skills_list);
            console.log(query_key);
        }else{
            $(this).val("")
            var that = this;
            //setTimeout(function(){ $(that).parents().eq(2).find('.autocomplete .autocomplete-items').html(""); }, 500);

        }
    }

});


$(".tags-input input").on( "focusout", function(event) {
    $(this).val("")
    var that = this;
    //setTimeout(function(){ $(that).parents().eq(2).find('.autocomplete .autocomplete-items').html(""); }, 500);

    //remove txt in input type='text'
    console.log('remove txt');
});


function _add_input_tag(el,data,text){
    let template="<span class=\"tag\"><span class=\"text\" _value='"+data+"'>"+text+"</span><span class=\"close\">&times;</span></span>\n";
    $(el).parents().eq(2).find('.data').append(template);
    $(el).val('')
}

$(".tags-input input").on( "keyup", function(event) {
    var query=$(this).val()

    if(event.which == 8) {
        if(query==""){
            console.log("Clearing suggestions");
            $('.autocomplete-items-test').html('');
            //$('.tags-input .autocomplete-items').html('');
            return;
        }
    }

    //$('.tags-input .autocomplete-items').html('');
    runSuggestions($(this),query)

});


//check arrow UP and DOWN

$(".tags-input input").on( "keydown", function(event) {

    if(query_key != old_query_key){
        old_query_key = query_key;
        if(stack_highlight = 0){
        }
        if(stack_highlight != query_key){
            stack_highlight = -1;
        }
    }

    //check_max_value
    var check_max_value = 0;
    $.getJSON("./skills_feed/skills_feed.php?skill="+ query_key, function(data_max) {
        check_max_value == data_max;
    });

    if(event.which == 38){
        console.log("UP");

        if(stack_highlight <= 0){
            stack_highlight = 0;
        }else{
            stack_highlight--;
        }
        
        console.log('input_skill', query_key);
    }

    if(event.which == 40){
        console.log("DOWN");

        //fix max value
        if(stack_highlight > (stack_highlight_max-2)){
            stack_highlight == stack_highlight_max;
        }else{
            stack_highlight++;      
        }
        console.log('input_skill', query_key);

    }
    console.log("stack_highlight", stack_highlight);

});

function list_select(){
    $.getJSON("./skills_feed/skills_feed.php?skill="+ query_key, function(x_data) {

        stack_highlight_max = x_data.length;

        if(query_key.length != stack_highlight_max){
            stack_highlight_max = x_data.length;
        }
        var highlight_arrow = "";

        $('.autocomplete-items-test').html('');
        $('.autocomplete-items_x').html('');

        for (let i = 0; i < x_data.length; i++) {
            if(i == stack_highlight){
                highlight_arrow = "highlight_arrow";
            }else{
                highlight_arrow = "";
            }
            $('.autocomplete-items-test').append("<div id='tags_list' class='div-items "+ highlight_arrow +"'>"+x_data[i].name +"</div>");
            
        }
    });
}

let _tag_input_suggestions_data = null;
var skills_tags = [];

function add_tags_skills(js_user_id){
    //add tags skills to input
    $.getJSON('/wp-skills_feed/skills_feed/skills_user.php?user_id='+js_user_id, function(skills_user) {

        for (let i = 0; i < skills_user.length; i++) {
            skills_tags.push(skills_user[i].name);
            console.log("skills_tags : ", skills_tags);

        }
    });
}



//click tags skills to add
$(document).ready(function(){
    // $("#text").on( "click", function(event){
    //     $('.suggested-skills').show('slow');
    // }

    $('#html_div_skills').hide();
    $( ".tag" ).click(function() {
        input_tags_skills();
        //delete x
        var tag_skill = $(this).text();
        var x_onclick = tag_skill.substring(tag_skill.length - 1, tag_skill.length);

        if(x_onclick == "×"){
            console.log("delete ×");
            var tag_skill = tag_skill.substring(0, tag_skill.length - 1);
        }

        const found_skills = skills_tags.find(element => element == tag_skill);
        if(found_skills){
            console.log("have skills ", tag_skill);
        }else{
            skills_tags.push(tag_skill);
            console.log("skills_tags : ", skills_tags);

        }
    });
});

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
    $('#html_div_skills').show('slow');
    //console.log("skills_tags : ", skills_tags);
});

/*
handle the click of close button on the tags
 */
;

$(document).on("click", ".tags-input .data .tag .close , #close_x", function() {
    // whatever you do to delete this row
    var clase_skills = $(this).parent().text();
    var del_x_clase_skills = clase_skills.substring(0, clase_skills.length - 1);

    //console.log("clase_skills = ", del_x_clase_skills);
    var del_tags_skills = skills_tags.indexOf(del_x_clase_skills);

    skills_tags.splice(del_tags_skills, 1);
    console.log("skills_tags : ", skills_tags);
    //console.log("ID Skill = ", del_tags_skills);


    $(this).parent().remove();
    input_tags_skills();
    $('.autocomplete-items-test').html('');

})

/*
Handle the click of one suggestion
*/

$(document).on("click", ".autocomplete-items div", function() {
    let index=$(this).index()
    let data=_tag_input_suggestions_data[index];
    let data_holder = $(this).parents().eq(4).find('.data')

    var find_in_skills = data.name;
    const found_skills = skills_tags.find(element => element == find_in_skills);
    if(found_skills){
        console.log("have skills ", find_in_skills);
    }else{
        if(skills_tags.length >= 5){
            alert("Only 5 skills allowed");
            $('.autocomplete-items-test').html('');
        }else{
            skills_tags.push(data.name);

            console.log("skills_tags : ", skills_tags);
            _add_input_tag(data_holder,data.id,data.name)
            $('.tags-input .autocomplete-items').html('');

            input_tags_skills();
        }

    }

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
                $.getJSON("/wp-skills_feed/skills_feed/skills_feed.php?skill="+ _tag_input_suggestions_data[0].name, function(x_data) {
                    console.log("have skill :", x_data[0].name);

                    //let template="<span class=\"tag\"><span class=\"text\" _value='"+x_data[0].name+"'>"+x_data[0].name+"</span><span class=\"close\">&times;</span></span>\n";
                    //$('.data').append(template);
                    const found_skills = skills_tags.find(element => element == x_data[0].name);
                    if(found_skills){
                        console.log("have skills ", find_in_skills);
                    }else{
                        if(skills_tags.length >= 5){
                            alert("Only 5 skills allowed");
                            $('.autocomplete-items-test').html('');
                        }else{
                            skills_tags.push(x_data[0].name);

                            console.log("skills_tags : ", skills_tags);

                            input_tags_skills();
                            $('.autocomplete-items-test').html('');
                        }
                    }
                    //END CHECK

                });
            }
        }else{
            if(_tag_input_suggestions_data != null & stack_highlight > 0){
                $.getJSON("/wp-skills_feed/skills_feed/skills_feed.php?skill="+ _tag_input_suggestions_data[stack_highlight].name, function(x_data) {
                    //let template="<span class=\"tag\"><span class=\"text\" _value='"+_tag_input_suggestions_data[stack_highlight].name+"'>"+_tag_input_suggestions_data[stack_highlight].name+"</span><span class=\"close\">&times;</span></span>\n";
                    //$('.data').append(template);
                    const found_skills = skills_tags.find(element => element == _tag_input_suggestions_data[stack_highlight].name);
                    if(found_skills){
                        console.log("have skills ", find_in_skills);
                    }else{
                        if(skills_tags.length >= 5){
                            alert("Only 5 skills allowed");
                            $('.autocomplete-items-test').html('');
                        }else{
                            skills_tags.push(_tag_input_suggestions_data[stack_highlight].name);

                            console.log("skills_tags : ", skills_tags);

                            input_tags_skills();
                            $('.autocomplete-items-test').html('');
                        }
                    }
                    //END CHECK
                });
            }
        }

        if(stack_highlight == -1){
            var name_shot_1 = _tag_input_suggestions_data[0].name
            $.getJSON("/wp-skills_feed/skills_feed/skills_feed.php?skill="+ name_shot_1, function(x_data) {
                //let template="<span class=\"tag\"><span class=\"text\" _value='"+name_shot_1+"'>"+name_shot_1+"</span><span class=\"close\">&times;</span></span>\n";
                //$('.data').append(template);
                const found_skills = skills_tags.find(element => element == name_shot_1);
                if(found_skills){
                    console.log("have skills ", find_in_skills);
                }else{
                    if(skills_tags.length >= 5){
                        alert("Only 5 skills allowed");
                        $('.autocomplete-items-test').html('');
                    }else{
                        skills_tags.push(name_shot_1);

                        console.log("skills_tags : ", skills_tags);

                        input_tags_skills();
                        $('.autocomplete-items-test').html('');
                    }
                }
                //END CHECK
            });
        }

        console.log(_tag_input_suggestions_data[0].name);


        if(skills_list.find(element => element == query_key)){
            console.log('have');
            let data = $(this).val()
                if(data!=""){
                    var find_in_skills = query_key;
                    const found_skills = skills_tags.find(element => element == find_in_skills);
                    if(found_skills){
                        console.log("have skills ", find_in_skills);
                        $(this).val("")
                    }else{

                        if(skills_tags.length >= 5){
                            alert("Only 5 skills allowed");
                            $('.autocomplete-items-test').html('');
                        }else{
                            skills_tags.push(query_key);
                            _add_input_tag(this,data,data)
                            console.log("skills_tags : ", skills_tags);
                            //console.log("query_key : ", query_key);
                        }

                    }
                }

        }else{
            console.log('null');
            $(this).val("")
            var that = this;
            setTimeout(function(){ $(that).parents().eq(2).find('.autocomplete .autocomplete-items').html(""); }, 500);

        }

    }

});


$(".tags-input input").on( "focusout", function(event) {
    $(this).val("");
    var that = this;
    setTimeout(function(){ $(that).parents().eq(2).find('.autocomplete-items-test').html(""); }, 300);
    console.log('remove txt');

});

//bug show tags skills
function _add_input_tag(el,data,text){
    $('.data').html('');
    for (let i = 0; i < skills_tags.length; i++) {
        let template="<span class=\"tag\"><span class=\"text\" _value='"+skills_tags[i]+"'>"+skills_tags[i]+"</span><span class=\"close\">&times;</span></span>\n";
        $(el).parents().eq(2).find('.data').append(template);
        $(el).val('')
    }

}

$(".tags-input input").on( "keyup", function(event) {
    var query=$(this).val()

    if(event.which == 8) {
        if(query==""){
            console.log("Clearing suggestions");
            $('.autocomplete-items-test').html('');
            $('.tags-input .autocomplete-items').html('');
            return;
        }
    }

    $('.tags-input .autocomplete-items').html('');
    runSuggestions($(this),query)

});

//click tags skills to add skills
$(document).on('click', '.skills-cloud', function() {
    //alert('Alert');
    var click_tag = $(this).text();

    const found_skills = skills_tags.find(element => element == click_tag);
    if(found_skills){
        console.log("have skills ", click_tag);
        $(this).val("")
    }else{
        if(skills_tags.length >= 5){
            alert("Only 5 skills allowed");
            $('.autocomplete-items-test').html('');
        }else{
            skills_tags.push(click_tag);
            input_tags_skills();
            $('.autocomplete-items-test').html('');
        }
    }


});

//Create tags in input
function input_tags_skills(){
    $('.input_tags_skills').html("");
    $('.data').html("");
    $('#add_li').html('');
    for (let i = 0; i < skills_tags.length; i++) {
        //$('.input_tags_skills').append("<input name='get_cand_skills[]' type='hidden' value='" + skills_tags[i] + "'>")
        //get_cand_skills[]
        let template="<span class=\"tag\"><span class=\"text\" _value='"+skills_tags[i]+"'>"+skills_tags[i]+"</span><span class=\"close\">&times;</span></span>\n";
        $('.data').append(template);
        $('#add_li').append("<li>" + "<input type='hidden' name='get_cand_skills[]' value='"+ skills_tags[i] +"'></li>");
    }
    console.log(skills_tags);
}

//check skills user account
function add_tags_skills(js_user_id){
    //add tags skills to input
    $.getJSON('/wp-skills_feed/skills_feed/skills_user.php?user_id='+js_user_id, function(skills_user) {
        for (let i = 0; i < skills_user.length; i++) {
            skills_tags.push(skills_user[i].name);
        }
    });
    console.log("skills_tags : ", skills_tags);
}

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
    $.getJSON("/wp-skills_feed/skills_feed/skills_feed.php?skill="+ query_key, function(data_max) {
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
    $.getJSON("/wp-skills_feed/skills_feed/skills_feed.php?skill="+ query_key, function(x_data) {

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

$(document).on('click','#tags_list', function() {
    var list_tags = $(this).text();
    console.log('list_tags:', list_tags);

    const found_skills = skills_tags.find(element => element == list_tags);
    if(found_skills){
        console.log("have skills ", find_in_skills);
    }else{
        if(skills_tags.length >= 5){
            alert("Only 5 skills allowed");
            $('.autocomplete-items-test').html('');
        }else{
            skills_tags.push(list_tags);
            $('.autocomplete-items-test').html('');

            console.log("skills_tags : ", skills_tags);

            input_tags_skills();
            $('.autocomplete-items-test').html('');
        }

    }

    
});

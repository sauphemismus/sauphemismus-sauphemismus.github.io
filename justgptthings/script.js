// generate from input----------------------------------------------------------

function generate(input, inputCount, temperature, token_count, splitChar, followFunction){

    query({
      inputs:
        input,  
      parameters: {
        min_length: token_count,
        max_length: token_count,
        temperature: temperature,
      },
      options: {
        wait_for_model: true,
        use_cache: false,
      },
    }).then((response) => {
      output = JSON.stringify(response);
      output = output.replace(/\n/g, "<br>");
      output = output.replace(/\\n/gm, " ");
      output = output.replace(/[\[\]\{\}\\"]/g, "");
      output = output.replace("generated_text:", "");
      
  
      var outArray = output.split(splitChar);
      followFunction(outArray[inputCount]);
      
  
    }).catch((error) => {})
  }
  
  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6B",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }


  function generateMVP(input, followFunction){

    query2({
      inputs:
        input,  
      parameters: {
        
      },
      options: {
        wait_for_model: true,
        use_cache: false,
      },
    }).then((response) => {
      output = JSON.stringify(response);
      output = JSON.parse(output);

      outArray_X = {};
      for (var i = 0; i < output.length; i++) {
        outArray_X[output[i].entity_group] = "";
      }
      for (var i = 0; i < output.length; i++) {
        if (outArray_X[output[i].entity_group] == "")
          outArray_X[output[i].entity_group] = output[i].word;
        else
          outArray_X[output[i].entity_group] += "," + output[i].word;
      }
      
      followFunction(outArray_X);
  
    }).catch((error) => {window.alert(error)})
   
  }
  
  async function query2(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/vblagoje/bert-english-uncased-finetuned-pos",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }
  
  // generate from input----------------------------------------------------------
  var running = false;

  document.onload = randomBg("nice sunset");
  document.onload = init();
  
  
  
  function randomBg(topic){
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    var random = Math.floor(Math.random() * 200);
    div = document.getElementById("bg_div");
    div.innerHTML = '<img id="background" src="https://source.unsplash.com/random/' + width + 'x' + height + '/?' + topic + '?sig=' + random + '">';
     
  }
  
  function randomFont(){
    array = ["UCUcharlesscript"];
    random = Math.floor(Math.random() * array.length);

    
    return UCU;
  }

  function randomTopic(){
    array = ["lifestyle", "van-life", "coffee", "aesthetic", "holding-hands-in-the-sun", "tumblr", "fall", "pumpkin-spice", "mood", "pinterest"];
    random = Math.floor(Math.random() * array.length);
    if (last_topic == array[random])
      randomTopic();
    else
      last_topic = array[random];
    return array[random];
  }
  
  function init(){
    if(running)
      return;
    
    running = true;
    var loader = document.getElementsByClassName("loader")[0];
    loader.style.display = "block";
  
    var div = document.getElementById("sprichwort");
    div.style.display = "none";
  
    generate(
      "when boys wear beanies*craving adventure 24/7*watching it rain*having the perfect shoes to go with your outfit*playing with your cat*wanting the perfect prom dress*getting a nose ring*trying not to wear the same outfit twice*having a cute hairstyle*being weird*painting your nails pastel colors for the spring time*coffee on chilly fall days*wishing you had enough money to travel the world*loving the warmth of their arms*making pinky promises*going on tumblr too much*loving to spend time with your best friend*christmas treats*soft neck kisses*growing your hair out*lazy fall days*taking your bra off after a long day*popcorn and movies*wanting to get away for a while*wanting cute, small tattoos*netflix and chill*being close to your sister*staying in bed all day*watching it rain*getting along better with guys than girls*making funny faces*",
      31, 1.0, 220, "*", neuerSpruch);

    
  }
  function keywords2BG(text){

    if ("NOUN" in text)
      var keywords = text["NOUN"];
    else if ("VERB" in text)
      var keywords = text["VERB"];
    else if ("ADJ" in text)
      var keywords = text["ADJ"];
    else if ("ADV" in text)
      var keywords = text["ADV"];
    else if ("ADP" in text)
      var keywords = text["ADP"];

    if ("NOUN" in text && "VERB" in text)
      var keywords = text["NOUN"] + "," + text["VERB"]; 
    if ("NOUN" in text && "VERB" in text && "ADV" in text)
      var keywords = text["NOUN"] + "," + text["VERB"] + "," + text["ADV"];
    if ("NOUN" in text && "VERB" in text && "ADJ" in text)
      var keywords = text["NOUN"] + "," + text["VERB"] + "," + text["ADJ"];
    //if ("NOUN" in text && "VERB" in text && "ADP" in text)
    //  var keywords = text["NOUN"] + "," + text["VERB"] + "," + text["ADP"];
    //if ("NOUN" in text && "VERB" in text && "ADV" in text && "ADJ" in text)
    //  var keywords = text["NOUN"] + "," + text["VERB"] + "," + text["ADV"] + "," + text["ADJ"] ;
    //if ("NOUN" in text && "VERB" in text && "ADV" in text && "ADJ" in text && "ADP" in text)
    //  var keywords = text["NOUN"] + "," + text["VERB"] + "," + text["ADV"] + "," + text["ADJ"] + "," + text["ADP"];


    randomBg(keywords);

  }
  
  function neuerSpruch(text){
    var spruch = document.getElementById("spruch");
    
    if (text.endsWith(" "))
      text = text.substring(0, text.length - 1);
    if (!text.endsWith(".") || !text.endsWith("!") || !text.endsWith("?"))
      spruch.innerHTML = text +".";
    
    var autor = document.getElementById("autor");
   
    const bangersFont = new FontFace('UCU Fuck it', 'url(UCUcharlesscript.ttf)');
    bangersFont.load().then(function (loadedFont) {
      document.fonts.add(loadedFont)
      autor.style.fontFamily = '"UCU Fuck it"';
    }).catch(function (error) {
      window.alert('Failed to load font: ' + error)
    })
    
    autor.innerHTML = "justgptthings";
  
    show_new();
    
  }

  
  function show_new(){
    new_topic = generateMVP(document.getElementById("spruch").innerHTML, keywords2BG);
    var div = document.getElementById("sprichwort");
    div.style.display = "grid";
  
    var loader = document.getElementsByClassName("loader")[0];
    loader.style.display = "none";
  
    running = false;
  
  }
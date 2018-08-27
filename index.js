function returnHTML(arr) {
  var out = "";
  var i;
  for(i = 0; i < arr.length; i++) {
    if (i < 10) {
      out += "<p><a href='" + arr[i].html_url + "' target='_blank'>" + arr[i].name + "</a> - " + arr[i].description + "</p>";
    }
  }
  
  out += "<p>...</p>";

  document.getElementById("text-repos").innerHTML = out;
}

function write(str, el) {
  var char = str.split('').reverse();
  var typer = setInterval(function() {
    if (!char.length) return clearInterval(typer);
    var next = char.pop();
    el.innerHTML += next + (char.length == 0 ? '<span class="blink">_</span>' : '');
  }, 100);
}

write('$ about', document.getElementById('title-about'));

site = {
  initialize: function() {
    this.eventsClick();
  },
  eventsClick: function() {
    document.getElementById('about').onclick = site.modifyContent;
    document.getElementById('coding').onclick = site.modifyContent;
    document.getElementById('repos').onclick = site.modifyContent;
  },
  modifyContent: function(evt) {
    var id = evt.currentTarget.id;
    
    document.getElementById('about').classList.remove('active');
    document.getElementById('coding').classList.remove('active');
    document.getElementById('repos').classList.remove('active');

    document.getElementById('box-about').style.display = 'none';
    document.getElementById('box-coding').style.display = 'none';
    document.getElementById('box-repos').style.display = 'none';

    document.getElementById('title-about').innerHTML = '$ vim';
    document.getElementById('title-coding').innerHTML = '$ vim';
    document.getElementById('title-repos').innerHTML = '$ ls';

    document.getElementById(id).classList.add('active');
    
    document.getElementById('box-' + id).style.display = 'block';
    
    var title = ' ' + id;

    write(title, document.getElementById('title-' + id));

    var xmlhttp = new XMLHttpRequest();
    var url = "https://api.github.com/users/felipe-alves-reis/repos";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            returnHTML(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
};

site.initialize();

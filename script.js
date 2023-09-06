const form = document.getElementById("myForm");

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const search = document.getElementById("search").value;
  const originalName = search.split(' ').join('');

  fetch("https://api.github.com/users/"+originalName)
  .then((result) => result.json())
  .then((data) => {

    document.getElementById("result").innerHTML = `
      <div id="main-info"></div>
      <div id="chart"></div>
      <div id="repos-info"></div>
    `

    const Since = data.created_at.substr(0,10);

    document.getElementById("main-info").innerHTML = `
      <div id="left">
        <img src="${data.avatar_url}" id="profile-img"/>
        <button class="btn btn-primary" id="profile-button">
        <a target="_blank" href="https://www.github.com/${originalName}" id="View-Profile">View Profile</a>
        </button>
      </div>
      <div id="right">
        <p id="name">${data.name}</p>
        <p id="Since">Since ${Since}</p>
        <div id="info">
          <div>
            <p>Repos</p>
            <p>${data.public_repos}</p>
          </div>
          <div>
            <p>Followers</p>
            <p>${data.followers}</p>
          </div>
          <div>
            <p>Following</p>
            <p>${data.following}</p>
          </div>
        </div>
      </div>
      
    `
    document.getElementById("chart").innerHTML = `
    <img src="https://ghchart.rshah.org/${data.login}" />
    `
    
    fetch(data.repos_url)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);

      const arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push([data[i].id,i]);
      }
      arr.sort((a, b) => b[0] + b[1] - (a[0] + a[1]))


      document.getElementById("repos-info").innerHTML = `
      <p>Latest Respos</p>
      <div id="repos-list">
        <div>
          <span><a href="${data[arr[0][1]].html_url}">${data[arr[0][1]].name}</a></span>
          <span id="language">Language : ${data[arr[0][1]].language}</span>
        </div>
        <div>
          <span><a href="${data[arr[1][1]].html_url}">${data[arr[1][1]].name}</a></span>
          <span id="language">Language : ${data[arr[1][1]].language}</span>
        </div>
        <div>
          <span><a href="${data[arr[2][1]].html_url}">${data[arr[2][1]].name}</a></span>
          <span id="language">Language : ${data[arr[2][1]].language}</span>
        </div>
        <div>
          <span><a href="${data[arr[3][1]].html_url}">${data[arr[3][1]].name}</a></span>
          <span id="language">Language : ${data[arr[3][1]].language}</span>
        </div>
        <div>
          <span><a href="${data[arr[4][1]].html_url}">${data[arr[4][1]].name}</a></span>
          <span id="language">Language : ${data[arr[4][1]].language}</span>
        </div>
      </div>
      `

    })
  })
})
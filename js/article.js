const cmsContents = document.querySelector('.blog-datail');
console.log("saaa");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);
const blogId = urlParams.get('blogId');
console.log('Blog ID:', blogId);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

fetch("https://mukuvocal.microcms.io/api/v1/blogs", {
  headers: {
    "X-MICROCMS-API-KEY": "AwSzjSj22uhvXf40MWifryeripkUj8TkVQ1i"
  }
})
  .then(res => res.json())
  .then(json => {
    for (let i = 0; i < json.contents.length; i++) {
      console.log(json.contents[i]);
      const target = json.contents[i];
      if (blogId === target.id) {
        const title = document.createElement("h1");
        const thumbnail = document.createElement("img");
        const time = document.createElement("time");
        const category = document.createElement("span");
        const div = document.createElement("div");

        category.textContent = target.category.name+":";
        time.textContent=formatDate(target.createdAt);
        thumbnail.setAttribute('src',target.eyecatch.url);
        title.textContent = target.title;
        div.innerHTML= target.content;
        div.classList.add('blog-datail-content');

        title.prepend(category);
        cmsContents.append(time,title,thumbnail,div);
      }

    }
});
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const truncateText = (text, maxLength) => {
  console.log(text.length);
  console.log(maxLength);
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + "...";
  }
};

const blogContents = document.querySelector('.blog-contents');
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

      const thumbnail = document.createElement("img");
      const time = document.createElement("time");
      const title = document.createElement("p");
      const li = document.createElement("li");
      const figa = document.createElement("a");
      const figcapa = document.createElement("a");
      const figure = document.createElement("figure");
      const figcaption = document.createElement("figcaption");

      time.textContent=formatDate(target.createdAt);
      thumbnail.setAttribute('src',target.eyecatch.url);
      title.textContent = truncateText(target.title,15);
      figa.setAttribute('href','./article.html?blogId='+target.id);
      figcapa.setAttribute('href','./article.html?blogId='+target.id);
      li.classList.add('item');
      
      figa.append(thumbnail);
      figcapa.prepend(title,time);
      figcaption.append(figcapa);
      figure.append(figa,figcaption);
      li.append(figure)
      blogContents.append(li);

    }
});
// 获取导航栏中的所有链接元素
const navLinks = document.querySelectorAll('nav a');

// 获取所有文章标题元素
const articleTitles = document.querySelectorAll('article h3');

// 获取所有文章元素
const articles = document.querySelectorAll('article');

// 遍历所有链接元素，为每个链接元素添加点击事件监听器
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    // 阻止默认的链接跳转行为
    //event.preventDefault();

    // 获取目标文章元素的id
    const targetId = event.target.getAttribute('href').substring(1);

    // 获取目标文章元素
    const targetArticle = document.getElementById(targetId);

    // 计算目标文章元素相对于文档顶部的偏移量
    const offset = targetArticle.offsetTop;

    // 滚动到目标文章元素处
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });

    // 取消其他导航栏链接元素的背景色和字体颜色
    navLinks.forEach((otherLink) => {
      otherLink.style.backgroundColor = '';
      otherLink.style.color = '';
    });

    // 改变当前导航栏链接元素的背景色和字体颜色
    link.style.backgroundColor = 'black';
    link.style.color = 'white';
  });
});

// 遍历所有文章标题元素，为每个标题元素添加鼠标移入事件监听器
articleTitles.forEach((title) => {
  title.addEventListener('mouseover', (event) => {
    // 改变标题字体颜色
    title.style.color = 'red';

    // 创建遮罩层元素
    const mask = document.createElement('div');
    mask.classList.add('mask');

    // 插入遮罩层元素
    title.appendChild(mask);

    // 动画：遮罩层从下方升起
    mask.animate(
      [
        { transform: 'translateY(100%)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 0.5 }
      ],
      {
        duration: 500,
        easing: 'ease-out'
      }
    );
  });

  // 为每个标题元素添加鼠标移出事件监听器
  title.addEventListener('mouseout', (event) => {
    // 改变标题字体颜色
    title.style.color = '';

    // 获取遮罩层元素
    const mask = title.querySelector('.mask');

    // 动画：遮罩层向下消失
    mask.animate(
      [
        { transform: 'translateY(0)', opacity: 0.5 },
        { transform: 'translateY(100%)', opacity: 0 }
      ],
      {
        duration: 500,
        easing: 'ease-out'
      }
    );

    // 移除遮罩层元素
    mask.addEventListener('animationend', (event) => {
      mask.remove();
    });
  });

  // 为每个标题元素添加点击事件监听器
  title.addEventListener('click', (event) => {
    // 遍历所有文章元素，将除目标文章元素以外的文章元素隐藏
	  articles.forEach((article) => {
		  if (article !== targetArticle) {
			  article.style.display = 'none';
		  }
	  });
	  // 改变目标文章元素的样式，并显示它
targetArticle.style.border = '2px solid red';
targetArticle.style.padding = '10px';
targetArticle.style.display = 'block';
  });
});

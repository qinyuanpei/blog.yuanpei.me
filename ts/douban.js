(()=>{var c=class{ele;subjectId;requestUrl;requestType;localData;constructor(e,t,i,s,a){if(this.ele=e,this.subjectId=t,this.requestUrl=i,this.requestType=s,this.localData=a?JSON.parse(a):null,this.localData){let r=this.convert(this.localData,this.requestType);this.requestType=="movie"?this.renderMovie(r):this.renderBook(r)}else{let r=this.fetchData();this.requestType=="movie"?this.renderMovie(r):this.renderBook(r)}}fetchData(){var e=localStorage.getItem(this.subjectId);if(e==null||typeof e>"u")fetch(this.requestUrl).then(t=>t.json()).then(t=>{let i={};if(this.requestType=="movie")i={title:t.data[0].name,link:"https://movie.douban.com/subject/"+t.doubanId,cover:t.data[0].poster,desc:t.data[0].description,star:Math.floor(parseFloat(t.doubanRating)),vote:t.doubanRating,genre:t.data[0].genre,date:t.dateReleased,director:t.director[0].data[0].name};else{let s=t.summary;s=s.replaceAll("<p>",""),s=s.replaceAll("</p>",""),i={title:t.title,link:"https://book.douban.com/subject/"+this.subjectId,cover:t.images.medium,desc:s,star:Math.floor(parseFloat(t.rating.average)),vote:t.rating.average,date:t.pubdate,author:t.author.join(",")}}return localStorage.setItem(this.subjectId,JSON.stringify(i)),i});else return JSON.parse(e)}renderMovie(e){let t=`
        <div class="post-preview"">
            <div class="post-preview--meta">
                <div class="post-preview--middle">
                    <h4 class="post-preview--title">
                        <a target="_blank" href="${e.link}">${e.title}</a>
                    </h4>
                    <div class="rating">
                        <div class="rating-star allstar${e.star}"></div>
                        <div class="rating-average">${e.vote}</div>
                    </div>
                    <time class="post-preview--date">
                        ${e.director}, ${e.genre}, ${e.date}
                    </time>
                    <section style="max-height: 75px; overflow: hidden;" class="post-preview--excerpt">
                        ${e.desc}
                    </section>
                </div>
            </div>
            <img class="post-preview--image" src="${e.cover}" loading="lazy">
        </div>
        `;this.ele.insertAdjacentHTML("afterend",t)}renderBook(e){let t=`
        <div class="post-preview"">
            <div class="post-preview--meta">
                <div class="post-preview--middle">
                    <h4 class="post-preview--title">
                        <a target="_blank" href="${e.link}">${e.title}</a>
                    </h4>
                    <div class="rating">
                        <div class="rating-star allstar${e.star}"></div>
                        <div class="rating-average">${e.vote}</div>
                    </div>
                    <time class="post-preview--date">
                        ${e.author}, ${e.date}
                    </time>
                    <section style="max-height: 75px; overflow: hidden;" class="post-preview--excerpt">
                        ${e.desc}
                    </section>
                </div>
            </div>
            <img class="post-preview--image" src="${e.cover}" loading="lazy">
        </div>
        `;this.ele.insertAdjacentHTML("afterend",t)}convert(e,t){return t=="movie"?{title:e.subject.title,link:e.subject.url,cover:e.subject.pic.normal,desc:e.comment?e.comment.substring(0,120)+"...":e.subject.card_subtitle,star:e.subject.rating.star_count,vote:e.subject.rating.value,genre:e.subject.genres.join(","),date:e.subject.pubdate[0],director:e.subject.directors[0].name}:{title:e.subject.title,link:e.subject.url,cover:e.subject.pic.normal,desc:e.subject.intro?e.subject.intro.substring(0,120)+"...":"",star:e.subject.rating.star_count,vote:e.subject.rating.value,date:e.subject.pubdate[0],author:e.subject.author[0]}}};window.DoubanCard=function(n,e,t,i,s){return new c(n,e,t,i,s)};})();

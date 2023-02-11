// const $ = document.querySelector.bind(document)
// const $$ = document.querySelectorAll.bind(document)


const PLAYER_STORAGE_KEY = "KEY_PLAYER";
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Neveda',
            singer: 'Vicetone',
            path: 'assets/music/baihat.mp3',
            image: 'assets/img/dunghoangpham.png'
        },
        {
            name: 'Summer Time',
            singer: 'K390',
            path: 'assets/music/baihat.mp3',
            image: 'assets/img/dunghoangpham.png'
        },
        {
            name: 'Summer Time',
            singer: 'K390',
            path: 'assets/music/baihat.mp3',
            image: 'assets/img/dunghoangpham.png'
        },
        {
            name: 'Summer Time',
            singer: 'K390',
            path: 'assets/music/baihat.mp3',
            image: 'assets/img/dunghoangpham.png'
        },
        {
            name: 'Summer Time',
            singer: 'K390',
            path: 'assets/music/baihat.mp3',
            image: 'assets/img/dunghoangpham.png'
        },
        {
            name: 'Summer Time',
            singer: 'K390',
            path: 'assets/music/baihat.mp3',
            image: 'assets/img/dunghoangpham.png'
        },
        {
            name: 'Summer Time',
            singer: 'K390',
            path: 'assets/music/baihat.mp3',
            image: 'assets/img/dunghoangpham.png'
        },
        {
            name: 'Summer Time',
            singer: 'K390',
            path: 'assets/music/baihat.mp3',
            image: 'assets/img/dunghoangpham.png'
        },
        {
            name: 'Summer Time',
            singer: 'K390',
            path: 'assets/music/baihat.mp3',
            image: 'assets/img/dunghoangpham.png'
        },
        {
            name: 'Summer Time',
            singer: 'K390',
            path: 'assets/music/baihat.mp3',
            image: 'assets/img/dunghoangpham.png'
        },
        {
            name: 'Summer Time',
            singer: 'K390',
            path: 'assets/music/baihat.mp3',
            image: 'assets/img/dunghoangpham.png'
        },
        {
            name: 'Summer Time',
            singer: 'K390',
            path: 'assets/music/baihat.mp3',
            image: 'assets/img/dunghoangpham.png'
        }
    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}" >
                <div
                class="thumb"
                style="
                    background-image: url('${song.image}');
                "
                ></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div >
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div> `
        })
        playlist.innerHTML = htmls.join('')
    },
    handleEvents: function () {
        // const cd = $('.cd')
        const cdWidth = cd.offsetWidth
        const _this = this

        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        document.onscroll = function (param) {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
                cdThumbAnimate.pause()
            } else {
                audio.play()
                cdThumbAnimate.play()
            }
        }
        audio.onplay = function () {
            player.classList.add('playing')
            _this.isPlaying = true
        }

        audio.onpause = function () {
            player.classList.remove('playing')
            _this.isPlaying = false
        }
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        progress.onchange = function (e) {
            const time = e.target.value * audio.duration / 100
            audio.currentTime = time
        }

        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        preBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
        }

        randBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randBtn.classList.toggle("active", _this.isRandom)
        }

        audio.onended = function (param) {
            if (_this.isRepeat) {
                audio.play()
            } else {
                if (_this.isRandom) {
                    _this.playRandomSong()
                } else {
                    _this.nextSong()
                }
                audio.play()
            }
        }
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle("active", _this.isRepeat)
        }
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {

                if (e.target.closest('.option')) {

                }

                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
            }
        }
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function () {
        // const heading = $('header h2')
        // const cdThumb = $('.cd-thumb')
        // const audio = $('#audio')
        console.log(heading, cdThumb, audio)
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 300);
    },
    start: function () {
        this.loadConfig()

        this.defineProperties()

        this.handleEvents()

        this.loadCurrentSong()

        this.render()

        randBtn.classList.toggle("active", this.isRandom)
        repeatBtn.classList.toggle("active", this.isRepeat)
    }
}
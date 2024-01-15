console.log("Welcome to Spotify");


//Initialize the veriables 
let songIndex = 0; 
let audioElement = new Audio('14.mp3');
// audioElement.play();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');

let masterSongName = document.getElementById('masterSongName');


let songItems = Array.from(document.getElementsByClassName('songItem'));




let songs = [
    {
        songName: "_Ram Siya Ram_192",
        filePath: "14.mp3",
        coverPath: "1.jpg"
    },

    {
        songName: "Not Ramaiya Vastavaiya",
        filePath: "2.mp3",
        coverPath: "2.jpg"
    },

    {
        songName: "Pehle Bhi Main_192",
        filePath: "3.mp3",
        coverPath: "3.jpg"
    },

    {
        songName: "Abrars Entry - Jamal Kudu",
        filePath: "4.mp3",
        coverPath: "4.jpg"
    },

    {
        songName: "Ranvijays Entry Medley",
        filePath: "5.mp3",
        coverPath: "5.jpg"
    },

    {
        songName: "Tere Pyar Mein",
        filePath: "6.mp3",
        coverPath: "6.jpg"
    },

    {
        songName: "Baarish Ke Aane Se",
        filePath: "7.mp3",
        coverPath: "7.jpg"
    },

    {
        songName: "_Mann Jogiya",
        filePath: "8.mp3",
        coverPath: "8.jpg"
    },

    {
        songName: "Tu Hai To Mujhe Phir Aur Kya Chahiye",
        filePath: "9.mp3",
        coverPath: "9.jpg"
    },

    {
        songName: "Tere Hawaale",
        filePath: "10.mp3",
        coverPath: "10.jpg"
    },

    {
        songName: "All We Need Is Love",
        filePath: "11.mp3",
        coverPath: "11.jpg"
    },

    {
        songName: "Maan Meri Jaan_192",
        filePath: "12.mp3",
        coverPath: "12.jpg"
    },

    {
        songName: "O Mahi O Mahi_192",
        filePath: "13.mp3",
        coverPath: "13.jpg"
    }
]

songItems.forEach((el,i)=>{
    el.getElementsByTagName("img")[0].src = songs[i].coverPath;
    el.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


//handle play/pause click

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play(); 

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

        gif.style.opacity = 1; 
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0; 
    }
})



// Listen to Events (Timeupdate)

audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;

    // Update time display
    const currentTimeFormatted = formatTime(audioElement.currentTime);
    const durationFormatted = formatTime(audioElement.duration);


    document.getElementById('currentTimeDisplay').innerText = currentTimeFormatted + ' / ' + durationFormatted;
});

myProgressBar.addEventListener("input", () => {
    // Seekbar
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    return formattedMinutes + ':' + formattedSeconds;
};


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};


// seperate song play 

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();

        const clickedElement = e.target;
        const clickedIndex = parseInt(clickedElement.id);

        // play/pause icon
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        // If the clicked song is the same as the currently playing song, toggle play/pause
        if (clickedIndex === songIndex) {
            if (audioElement.paused) {
                audioElement.play();
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            } else {
                audioElement.pause();
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
            }
        } else {
            // If a different song is clicked, update the song and play
            songIndex = clickedIndex;
            audioElement.src = `${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;

            // Update master play icon
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
    });
});




//next element

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 9){
        songIndex = 0;
    }else{
        songIndex += 1; 
    }

    audioElement.src = `${songIndex + 1}.mp3`; 

    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0; 
    audioElement.play(); 
    gif.style.opacity = 1;

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})


// Previous Element

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }else{
        songIndex -= 1; 
    }

    audioElement.src = `${songIndex + 1}.mp3`; 

    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0; 
    audioElement.play(); 
    gif.style.opacity = 1;

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})


// media query in css 


//About ID


const aboutInformation = document.getElementById('about-information');
const aboutTooltip = document.getElementById('about-tooltip');

aboutInformation.addEventListener('mouseover', function(event) {
    const aboutContent = '<p>Gautam Jayvant Gavkar | gautam.gavkar@mitaoe.ac.in</p>';
    
    // Show the tooltip with a fade-in effect
    aboutTooltip.innerHTML = aboutContent;
    aboutTooltip.style.left = event.pageX + 'px';
    aboutTooltip.style.top = event.pageY + 'px';
    aboutTooltip.style.display = 'block';
    setTimeout(() => {
        aboutTooltip.style.opacity = '1';
    }, 10); // Delay the opacity transition for a smoother effect
});

aboutInformation.addEventListener('mouseout', function() {
    // Hide the tooltip with a fade-out effect
    aboutTooltip.style.opacity = '0';
    setTimeout(() => {
        aboutTooltip.style.display = 'none';
    }, 300); // Set the timeout to match the opacity transition duration
});

// const socket = io('/');

// let myVideoFeed;
// const videoGrid = document.getElementById("video-container");
// const myVideo = document.createElement('video')
// const myPeer = new Peer(undefined, {
//     path: '/peerjs',
//     host: '/',
//     port: '3000'
//   })

//   myPeer.on('open' , id=>{
//       console.log(id);
//       socket.emit('join-room', RoomId , id);
//   })
 

  
// navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: false
//       }).then(stream =>{
//             myVideoFeed= stream;
//             addVideoStream(myVideo, stream);
           
           
//             myPeer.on('call', call => {
//               call.answer(stream)
//               const video = document.createElement('video')

//               call.on('stream', function(remoteStream) {
//                 addVideoStream(video , remoteStream);

//               });

//             })
//             socket.on('user-connected' , (userId)=>{
//               console.log("😁😀😀" , userId);
//               setTimeout(() => {
//                 // user joined
//                 connectToNewUser(userId, stream)
//               }, 3000)
//             })                
          
//       })

//       function addVideoStream(video, stream) {
//         video.srcObject = stream
//         video.addEventListener('loadedmetadata', () => {
//           video.play()
//         })
//         videoGrid.append(video);
//       }
//       const connectToUser=(userId , stream)=>{
//         var call = myPeer.call(userId, stream)
//         const video = document.createElement('video')
//         call.on('stream', userVideoStream => {
//             addVideoStream(video , userVideoStream);
//         })
//        }
const socket = io('/');

 const videoGrid = document.getElementById("video-container");
     const myVideo = document.createElement('video');
const peers = {}
const myPeer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '443'
  })


   
    let myVideoFeed;
navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      }).then((videoAudio) => {
          myVideoFeed= videoAudio;
          addVideoStream(myVideo, videoAudio);

              myPeer.on('call', call => {
              call.answer(videoAudio)
              const video = document.createElement('video')

              call.on('stream', function(remoteStream) {
                addVideoStream(video , remoteStream);

              });

            })

          socket.on('user-connected' , (userId)=>{
            console.log( "connected user's id - " + userId);
            connectToUser(userId , videoAudio);
          })
          socket.off('user-connected' , (userId)=>{
            console.log( "connected user's id - " + userId);
            connectToUser(userId , videoAudio);
          })
         
      })

          myPeer.on('open' , userId=>{
      console.log("my user id - " + userId);
      socket.emit('join-room', RoomId , userId );
    })
 
      const connectToUser=(userId , stream)=>{
        var call = myPeer.call(userId, stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video , userVideoStream);
        })
       }

      function addVideoStream(video, stream) {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
        videoGrid.append(video);
      }
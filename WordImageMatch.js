import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./WordImageMatch.css";

const data = [
  { word: 'Apple', images: [
    'https://plus.unsplash.com/premium_photo-1724249990837-f6dfcb7f3eaa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGV8ZW58MHx8MHx8fDA%3D',
    'https://th.bing.com/th/id/R.f2fbe9958330d2a911b471349b444daf?rik=FD%2fFYAGFPOSOHw&riu=http%3a%2f%2f2.bp.blogspot.com%2f-fxadAknr--E%2fUpgZ0poSyBI%2fAAAAAAAABxU%2foCMldzw3Isw%2fs1600%2fpappaya%2bcopy.jpg%23papaya+fruit+1000x1096&ehk=mn%2b2FZG7%2bZ3phbGgtSZJrYK%2bgxP67MBFtq%2fdxfCZKWc%3d&risl=&pid=ImgRaw&r=0',
    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFuYW5hfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1547514701-42782101795e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3JhbmdlfGVufDB8fDB8fHww'], 
    correct: 0 },
  { word: 'Ball', images: [
    'https://edsports.ie/wp-content/uploads/cm/data/product-1631/Adidas-LX24-Compo-3-Composite-Hockey-Stick-2017.jpg',
    'https://images.unsplash.com/photo-1557493680-99ae26025be8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVubmlzJTIwcmFja2V0fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFsbHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VufGVufDB8fDB8fHww'], 
    correct: 2 },
  { word: 'Cat', images: [
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1673448998919-d4b859e66e7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9ua2V5fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1551606712-b0341396cc87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVsbHxlbnwwfHwwfHx8MA%3D%3D'], 
    correct: 0 },
  { word: 'Dog', images: [
    'https://plus.unsplash.com/premium_photo-1664304299664-a8e2e2f80290?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29hdHxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fHww',
    'https://wallpaperaccess.com/full/2111331.jpg',
    'https://images.unsplash.com/photo-1575014912260-91c2b5ad7441?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hlZXB8ZW58MHx8MHx8fDA%3D'], 
    correct: 1},
  { word: 'Elephant', images: [
    'https://images.unsplash.com/photo-1563204996-8965f0a4a860?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdpcmFmZmV8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1616599458812-d7c86e0add7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FtZWx8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1603483080228-04f2313d9f10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVsZXBoYW50c3xlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1553284965-fa61e9ad4795?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9yc2V8ZW58MHx8MHx8fDA%3D'],
     correct: 2 },
  { word: 'Fish', images: [
    'https://images.unsplash.com/photo-1553659971-f01207815844?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JhYnxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlzaHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1514503612056-e3f673b3f3bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RhciUyMGZpc2h8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1543007168-5fa9b3c5f5fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG9jdG9wdXN8ZW58MHx8MHx8fDA%3D'], 
    correct: 1 },
  { word: 'Grapes', images: [
    'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2l3aXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBvbWVncmFuYXRlfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRhbmdlcmluZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1692813664205-d567a6829a10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhcGVzfGVufDB8fDB8fHww'], 
    correct: 3 },
  { word: 'Horse', images: [
    'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9yc2V8ZW58MHx8MHx8fDA%3D',
    'https://plus.unsplash.com/premium_photo-1668446123344-d7945fb07eaa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y293fGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1664302669447-d63f6c898f2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVmZmFsb3xlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1532784774615-647af4990186?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVsbHxlbnwwfHwwfHx8MA%3D%3D'], 
    correct: 0 },
  { word: 'Ice Cream', images: [
    'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FrZXN8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2llfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWNlY3JlYW18ZW58MHx8MHx8fDA%3D',
    'https://tse1.mm.bing.net/th/id/OIP.A2_1JTIiA6lXhcsM9cjoWwHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3'], 
    correct: 2},
  { word: 'Jeep', images: [
    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://media.istockphoto.com/id/1141690656/photo/crane-working-near-sand-quarry.webp?a=1&b=1&s=612x612&w=0&k=20&c=T4Tyb3fm6KgNNUaBToX5LiDWJcazTmH7e3IM12jPYkU=',
    'https://images.unsplash.com/photo-1586458995526-09ce6839babe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNyYW5lfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVlcHxlbnwwfHwwfHx8MA%3D%3D'],
     correct: 3 },
  { word: 'Kite', images: [
    'https://plus.unsplash.com/premium_photo-1724384503241-86f05f2a1bf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnV0dHRlcmZseXxlbnwwfHwwfHx8MA%3D%3D',
    'https://media.istockphoto.com/id/172777464/photo/red-kite-in-the-sky.jpg?s=2048x2048&w=is&k=20&c=XNIvDjZdtxwKIlOLYirKUkvpienTniyWWWcDQ7ktXj8=',
    'https://media.istockphoto.com/id/184347141/photo/white-mid-sized-passenger-jet-airplane.webp?a=1&b=1&s=612x612&w=0&k=20&c=lSuqpTBzdw7HL61wBbf4H1cKFVBRl741wntvEv4XzWc=',
    'https://images.unsplash.com/photo-1615927998810-ca467ad48c5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWF0fGVufDB8fDB8fHww'], 
    correct: 1 },
  { word: 'Lion', images: [
    'https://plus.unsplash.com/premium_photo-1661917764797-43c9545074aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBiZWFyfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    'https://media.istockphoto.com/id/878879868/photo/albino-white-deer.webp?a=1&b=1&s=612x612&w=0&k=20&c=es05OvhIxaWWxam0C0_Wtoo5DNCDn3KyUHylUQ4SD20=',
    'https://media.istockphoto.com/id/178574885/photo/spotted-deer-male-corbett-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=0AVWMhLFY9CCVXnjK-86cm0AjqFqn7ytAuovGROsnaM='],
     correct: 1},
  { word: 'Monkey', images: [
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1678228087961-5ec44797cb2b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29hdCUyMGJhYnl8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1605559911160-a3d95d213904?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9ua2V5fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'], 
    correct: 2 },
  { word: 'Nest', images: [
    'https://live.staticflickr.com/7156/6760365375_47e67bbd35_z.jpg',
    'https://www.thespruce.com/thmb/jGQ7a1Ky4G4YbO_gcCSnk4YN9s0=/4727x3141/filters:no_upscale():max_bytes(150000):strip_icc()/house-finch-nest-1168008180-67d8900a15d8480a93afc354ab5b6983.jpg',
    'https://blythewoodworks.com/wp-content/uploads/2018/09/goliath-duplex.jpg',
    'https://th.bing.com/th/id/R.fc5cab6a042793f223c54a3777c7259c?rik=%2bTf7orPBpXoQqg&riu=http%3a%2f%2fmedia.istockphoto.com%2fphotos%2fcage-picture-id153690578%3fk%3d6%26m%3d153690578%26s%3d612x612%26w%3d0%26h%3d3hIjFSb3sDdJm-qB-DUcaR-rIiddsgQUh_Z_S_EydV0%3d&ehk=fyPIZiesX6E3%2f77oUGK8d3YRT0kVUyVVYsctvPe1se8%3d&risl=&pid=ImgRaw&r=0'], 
    correct: 1 },
  { word: 'Orange', images: [
    'https://plus.unsplash.com/premium_photo-1724249990837-f6dfcb7f3eaa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGV8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1547514701-42782101795e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3JhbmdlfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFuYW5hfGVufDB8fDB8fHww',
    'https://th.bing.com/th/id/R.f2fbe9958330d2a911b471349b444daf?rik=FD%2fFYAGFPOSOHw&riu=http%3a%2f%2f2.bp.blogspot.com%2f-fxadAknr--E%2fUpgZ0poSyBI%2fAAAAAAAABxU%2foCMldzw3Isw%2fs1600%2fpappaya%2bcopy.jpg%23papaya+fruit+1000x1096&ehk=mn%2b2FZG7%2bZ3phbGgtSZJrYK%2bgxP67MBFtq%2fdxfCZKWc%3d&risl=&pid=ImgRaw&r=0'],
     correct: 1 },
  { word: 'Parrot', images: [
    'https://animalia-life.club/data_images/parrot/parrot4.jpg',
    'https://images.pexels.com/photos/4964676/pexels-photo-4964676.jpeg?cs=srgb&dl=pexels-rajukhan-pathan-4964676.jpg&fm=jpg',
    'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/85864161/1800',
    'https://jooinn.com/images/bald-eagle-flying-5.jpg'], 
    correct: 0 },
  { word: 'Queen', images: [
    'https://thumbs.dreamstime.com/z/colorful-caricature-animated-cartoon-boy-dressed-as-king-d-model-playful-cartoon-illustration-depicting-king-293885178.jpg',
    'https://img.freepik.com/premium-photo/adorable-cute-queen-digital-animation_973893-365.jpg',
    'https://thumbs.dreamstime.com/b/farmer-anime-young-boy-activity-field-plants-background-concept-ai-generated-292448962.jpg',
    'https://img.freepik.com/premium-photo/anime-girl-student-drawing_705652-404.jpg'], 
    correct: 1 },
  { word: 'Rabbit', images: [
    'https://wallpapers.com/images/hd/cute-rabbit-pictures-h3dgqw01id5qdmm5.jpg',
    'https://tse3.mm.bing.net/th/id/OIP.XYfMhr3QgqvOvFMyCHJVVgHaEo?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://cdn.britannica.com/02/152302-050-1A984FCB/African-savanna-elephant.jpg',
    'https://tse4.mm.bing.net/th/id/OIP.-k1d0epsDMS7iwHyHp9EiAHaE4?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3'], 
    correct: 0 },
  { word: 'Sun Flower', images: [
    'https://www.lewisginter.org/wp-content/uploads/2021/03/Tom-Hennessy-LGBG-June-29-TJH_3314-scaled.jpg',
    'https://static.vecteezy.com/system/resources/previews/002/965/261/large_2x/close-up-jasmine-flower-in-a-garden-beautiful-jasmine-white-flowers-free-photo.jpg',
    'https://cdn.pixabay.com/photo/2017/10/24/18/17/rose-2885586_960_720.jpg',
    'https://images.pexels.com/photos/1169084/pexels-photo-1169084.jpeg?cs=srgb&dl=nature-sunny-flowers-1169084.jpg&fm=jpg'], 
    correct: 3 },
  { word: 'Tiger', images: [
    'https://www.thoughtco.com/thmb/0Ws_5e7H1D5L31cnuHnKUL5h8Rk=/1250x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-872346454-5c37b2dec9e77c000132a628.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/P.t.altaica_Tomak_Male.jpg/1200px-P.t.altaica_Tomak_Male.jpg',
    'https://tse4.mm.bing.net/th/id/OIP.d3Y8leWUHeyzHK3Om2zgoAHaIA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://th.bing.com/th/id/R.7933a9576095b4cf22fe426091502df6?rik=pdYkwhJDwG5Csw&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2f0%2f0c%2fCow_female_black_white.jpg&ehk=1i2ngMzgQ1X4szHX6FXfybHE1%2fCbfxkbeMf5NjcpkY0%3d&risl=&pid=ImgRaw&r=0'], 
    correct: 1 },
  { word: 'Unicorn', images: [
    'https://www.1800flowers.com/_next/image?url=https:%2F%2Fimages.contentstack.io%2Fv3%2Fassets%2Fbltcedd8dbd5891265b%2Fblt72672fc6caded272%2F6668d5bdf5dc640271b66b85%2Funicorn.jpg&w=3840&q=75',
    'https://th.bing.com/th/id/R.7bf71a459877e278e3a380318d6d18a7?rik=9XKxIdHskNGf%2fg&riu=http%3a%2f%2fwww.publicdomainpictures.net%2fpictures%2f20000%2fvelka%2fzebra.jpg&ehk=j7fNdizS5MAwMTd2AHfgQONjZG%2bD5X68CiBA55ohyis%3d&risl=&pid=ImgRaw&r=0',
    'https://cdn.britannica.com/68/143568-050-5246474F/Donkey.jpg',
    'https://4.bp.blogspot.com/-1jQvfFNCgqk/XLJ_Q2ZFzoI/AAAAAAAAuDc/f2snVTu_Hqor-SZRJDzzC-Bcjft81oq_gCEwYBhgL/s1600/2%2Bwild%2Bwater%2Bbuffalo%2B-%2Byala.jpg'], 
    correct: 0 },
  { word: 'Violin', images: [
    'https://tse3.mm.bing.net/th/id/OIP.TVOoHP8uphtl1uwMapMK7gHaFG?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://th.bing.com/th/id/R.07eac50dd4bef48266f0f0ec2ae95011?rik=PS9AH15KSXV40Q&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2ff%2ff4%2fGerman%2c_maple_Violin.JPG&ehk=%2fkZJpKmWHUsjz370ACgGeDTaq8UMDDaaG5VeVXbY3PY%3d&risl=&pid=ImgRaw&r=0',
    'https://www.metrolibrary.org/sites/default/files/2023-03/piano.jpg',
    'https://tse1.mm.bing.net/th/id/OIP.L0fUOhd3bSzPnD01SZDL0AHaEQ?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3'], 
    correct: 1 },
  { word: 'Watch', images: [
    'https://tse4.mm.bing.net/th/id/OIP.sj0XvkbUQyzaZVKHxjHN_AHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://img.muji.net/img/item/4549337330030_1260.jpg',
    'https://www.techspot.com/images/products/2023/wearables/org/2023-08-10-product.jpg',
    'https://www.southjewellery.com/wp-content/uploads/2014/04/Indian_diamond_bangles.jpg'],
     correct: 2 },
  { word: 'Xylophone', images: [
    'https://upload.wikimedia.org/wikipedia/commons/4/45/GuitareClassique5.png'
    ,'https://m.media-amazon.com/images/I/71ttaYC3mgL._AC_SL1500_.jpg',
    'https://tse4.mm.bing.net/th/id/OIP.MeXCt6xT0t77cH0PdtXi9gHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://eskipaper.com/images/photo-violin-1.jpg'], 
    correct: 2 },
  { word: 'Yak', images: [
    'https://i.natgeofe.com/n/16fc1c64-7589-46da-8350-aa3b01da2152/3961779_16x9.jpg',
    'https://tse2.mm.bing.net/th/id/OIP.1-0RbzFC291R5tMQDgdhJQHaE3?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://wallpapers.com/images/hd/yak-1200-x-1015-picture-ptjmdfdrcua2lmje.jpg',
    'https://site-547756.mozfiles.com/files/547756/medium/Dog2.jpg'], 
    correct: 2 },
  { word: 'Zebra', images: [
    'https://th.bing.com/th/id/R.b6f01f9ca6193c32f946c8999998bcfd?rik=HWYzoH2YKULTlw&riu=http%3a%2f%2feskipaper.com%2fimages%2ffox-1.jpg&ehk=Mf699xKFgIVpBQ7G7%2fwi%2bEX5DW%2fQmH8wNWCZkF0tKOg%3d&risl=&pid=ImgRaw&r=0',
    'https://th.bing.com/th/id/R.7bf71a459877e278e3a380318d6d18a7?rik=9XKxIdHskNGf%2fg&riu=http%3a%2f%2fwww.publicdomainpictures.net%2fpictures%2f20000%2fvelka%2fzebra.jpg&ehk=j7fNdizS5MAwMTd2AHfgQONjZG%2bD5X68CiBA55ohyis%3d&risl=&pid=ImgRaw&r=0',
    'https://th.bing.com/th/id/R.ccb0445073d3d77094d5539d3d27334a?rik=I34u2lF6tucYlA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-Zp5MdnpTF2U%2fUOMHRt7VFHI%2fAAAAAAAADcc%2fgKfP9encfWA%2fs1600%2fImage_7.jpg&ehk=O72wVVFRtjAbvaW4LwTAo8EHKtrvkZAKeq9qkQLPHQU%3d&risl=&pid=ImgRaw&r=0',
    'https://wallpapers.com/images/hd/beautiful-black-donkey-1qwt92vz62956yeh.jpg'], 
    correct: 1 }
];


export default function WordImageMatch({ childName }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongSelected, setWrongSelected] = useState(false);
  const saveOnce = useRef(false);

  const item = data[index];

  // Function for speech
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      v => v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("zira")
    );
    if (femaleVoice) utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
  };

  // Handle image click
  const handleClick = (i) => {
    if (selected !== null) return;
    setSelected(i);

    if (i === item.correct) {
      setScore(prev => prev + 1);
      speak("Correct");
      setWrongSelected(false);
    } else {
      speak("Try Again");
      setWrongSelected(true);
    }
  };

  // Next question
  const next = () => {
    if (index < data.length - 1) {
      setSelected(null);
      setWrongSelected(false);
      setIndex(prev => prev + 1);
    } else {
      setFinished(true);
    }
  };

  // Previous question
  const previous = () => {
    if (index > 0) {
      setSelected(null);
      setWrongSelected(false);
      setIndex(prev => prev - 1);
    }
  };

  // Retry for wrong answer
  const retry = () => {
    setSelected(null);
    setWrongSelected(false);
  };

  // Save score to backend when finished
  useEffect(() => {
    if (finished && childName && !saveOnce.current) {
      saveOnce.current = true;
      fetch("http://localhost:3000/saveScore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName,
          score,
          total: data.length,
          date: new Date(),
          collection: "wordImageResults",
          database: "myproject",
        }),
      })
        .then(res => res.json())
        .then(result => console.log("Score saved:", result))
        .catch(err => console.error("Error saving score:", err));
    }
  }, [finished, childName, score]);

  if (finished) {
    return (
      <div className="score-card-container">
        <div className="score-card">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {data.length}</p>
          <button onClick={() => navigate("/activities")}>Back to Activities</button>
        </div>
      </div>
    );
  }

  return (
    <div className="word-match">
      <h1>Word–Image Match Game</h1>
      <div className="score">Score: {score}</div>
      <div className="word">
        Select the picture for: <strong>{item.word}</strong>
      </div>
      <div className="grid">
        {item.images.map((img, i) => {
          let border = "gray";
          if (selected !== null) border = i === item.correct ? "green" : i === selected ? "red" : "gray";
          return (
            <img
              key={i}
              src={img}
              alt={`option-${i}`}
              className="image-btn"
              style={{ borderColor: border }}
              onClick={() => handleClick(i)}
            />
          );
        })}
      </div>
      <div className="buttons">
        {wrongSelected && <button onClick={retry} className="retry-btn">Retry</button>}
        <button onClick={previous} className="previous-btn">Previous</button>
        <button onClick={next} className="next-btn">Next</button>
      </div>
      <div className="buttons">
        <button onClick={() => navigate("/activities")} className="back-btn">Back</button>
      </div>
    </div>
  );
}

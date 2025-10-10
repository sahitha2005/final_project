import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WordImageMatch.css";

const data = [
  { word: 'Apple', images: [
    'https://plus.unsplash.com/premium_photo-1724249990837-f6dfcb7f3eaa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGV8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFuYW5hfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFuYW5hfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1547514701-42782101795e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3JhbmdlfGVufDB8fDB8fHww'], 
    correct: 0 },
  { word: 'Ball', images: [
    'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFsbHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1557493680-99ae26025be8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVubmlzJTIwcmFja2V0fGVufDB8fDB8fHww',
    'https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEWIu%2BaP9XjhdW2KNIrlJtqzropljtCUQXxD446%2BCMe1e2I6ZIgyirSRAJEuDqdC7P8XJ62IN2AWUOfofDKQpD71Tu0Cz3lWTjW0ICekfL7wvHUe5hmI5UGr4n3hd6wGU%2BDo26Sz0lONr%2FsbgP3qDmJd8KGEkrrPOGu6mVQQq659ueGnuUoPkzF3M0leJchCCuLPeiufwHwZcVt76gWgs%2FZ9Xp5W8zoo%2FGjCzL8z6W32hqK3Oc0HZz1KAmWm0k1G5vA9hGGpN54IYPmwrA2WfUuQi54P3w03UZhQ9l4JACE1JzaXQv7U85udwKVYxbvsWEMBXkY%2BwI2No0Y0UYef%2FExCpvEp%2BFNilosbreXZIJlxQO5K5ZW7b0b4XjfVoHI%2B0UAkYEjiTZVdBoBJsbFbvLvMDXucJGMPII%2FICA6BGnK6VLFm9gbp%2B0IiK2P7UnfxvH32Y%2FToZQmBgObgm4XvjNbVNbXfIWF09TN23jQSLo5BYWVrp999fbrW2Zjc8OCbzT1iMOJkSuDuCsMTsucma9xqoVQuL5PJSEuWiXpaZkyTIjmBI6cP6hQzMxBj1KAOazrxTra3grI0aRyDQp0%3D&allow_caching=true&sz=w512',
    'https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VufGVufDB8fDB8fHww'], 
    correct: 0 },
  { word: 'Cat', images: [
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1673448998919-d4b859e66e7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9ua2V5fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1551606712-b0341396cc87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVsbHxlbnwwfHwwfHx8MA%3D%3D'], 
    correct: 0 },
  { word: 'Dog', images: [
    'https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1664304299664-a8e2e2f80290?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29hdHxlbnwwfHwwfHx8MA%3D%3D',
    'https://lh4.googleusercontent.com/proxy/KFRU97KdoyNnnoa17mLctuctuLS7X8jlRXw2OB__rMPhkntj45EmOIakialTRFwU0wTA_QRAn-AMZFwqnENN_ktn96O0w1aiDOU9PULBwjhUxSdIEpXjjnVEhGzLie_Y6Uym-rAMrQT9l-jVo0CyjiIf_EruzXgjWlz0j_OAwYo16qdDhVgtiEhAGfSjmiZ3-Ji9qT36PyPgNGYTVgQlNJgy6bk8g-vlf9jAoM6mgeolyrAjxYpvYmhI3SWSVAmOGkVBDQ',
    'https://images.unsplash.com/photo-1575014912260-91c2b5ad7441?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hlZXB8ZW58MHx8MHx8fDA%3D'], 
    correct: 0 },
  { word: 'Elephant', images: [
    'https://images.unsplash.com/photo-1563204996-8965f0a4a860?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdpcmFmZmV8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1616599458812-d7c86e0add7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FtZWx8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1603483080228-04f2313d9f10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVsZXBoYW50c3xlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1553284965-fa61e9ad4795?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9yc2V8ZW58MHx8MHx8fDA%3D'],
     correct: 0 },
  { word: 'Fish', images: [
    'https://images.unsplash.com/photo-1553659971-f01207815844?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JhYnxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlzaHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1514503612056-e3f673b3f3bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RhciUyMGZpc2h8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1543007168-5fa9b3c5f5fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG9jdG9wdXN8ZW58MHx8MHx8fDA%3D'], 
    correct: 0 },
  { word: 'Grapes', images: [
    'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2l3aXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBvbWVncmFuYXRlfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRhbmdlcmluZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1692813664205-d567a6829a10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhcGVzfGVufDB8fDB8fHww'], 
    correct: 0 },
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
    'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2llfGVufDB8fDB8fHww'], 
    correct: 0 },
  { word: 'Jeep', images: [
    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://media.istockphoto.com/id/1141690656/photo/crane-working-near-sand-quarry.webp?a=1&b=1&s=612x612&w=0&k=20&c=T4Tyb3fm6KgNNUaBToX5LiDWJcazTmH7e3IM12jPYkU=',
    'https://images.unsplash.com/photo-1586458995526-09ce6839babe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNyYW5lfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVlcHxlbnwwfHwwfHx8MA%3D%3D'],
     correct: 0 },
  { word: 'Kite', images: [
    'https://plus.unsplash.com/premium_photo-1724384503241-86f05f2a1bf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnV0dHRlcmZseXxlbnwwfHwwfHx8MA%3D%3D',
    'https://media.istockphoto.com/id/172777464/photo/red-kite-in-the-sky.jpg?s=2048x2048&w=is&k=20&c=XNIvDjZdtxwKIlOLYirKUkvpienTniyWWWcDQ7ktXj8=',
    'https://media.istockphoto.com/id/184347141/photo/white-mid-sized-passenger-jet-airplane.webp?a=1&b=1&s=612x612&w=0&k=20&c=lSuqpTBzdw7HL61wBbf4H1cKFVBRl741wntvEv4XzWc=',
    'https://images.unsplash.com/photo-1615927998810-ca467ad48c5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWF0fGVufDB8fDB8fHww'], 
    correct: 0 },
  { word: 'Lion', images: [
    'https://plus.unsplash.com/premium_photo-1661917764797-43c9545074aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBiZWFyfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    'https://media.istockphoto.com/id/878879868/photo/albino-white-deer.webp?a=1&b=1&s=612x612&w=0&k=20&c=es05OvhIxaWWxam0C0_Wtoo5DNCDn3KyUHylUQ4SD20=',
    'https://media.istockphoto.com/id/178574885/photo/spotted-deer-male-corbett-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=0AVWMhLFY9CCVXnjK-86cm0AjqFqn7ytAuovGROsnaM='],
     correct: 0 },
  { word: 'Monkey', images: [
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1678228087961-5ec44797cb2b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29hdCUyMGJhYnl8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1605559911160-a3d95d213904?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9ua2V5fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'], 
    correct: 0 },
  { word: 'Nest', images: [
    'https://i.ibb.co/2g5s3Y0/nest.jpg',
    'https://i.ibb.co/6Dg3VgD/bird.jpg',
    'https://i.ibb.co/WzLhY8c/egg.jpg',
    'https://i.ibb.co/7CQVJNm/leaf.jpg'], 
    correct: 0 },
  { word: 'Orange', images: [
    'https://i.ibb.co/3kWj5q0/orange.jpg',
    'https://i.ibb.co/7CQVJNm/apple.jpg',
    'https://i.ibb.co/9cLqK7H/banana.jpg',
    'https://i.ibb.co/YkZV9cH/grapes.jpg'],
     correct: 0 },
  { word: 'Parrot', images: [
    'https://i.ibb.co/6Dg3VgD/parrot.jpg',
    'https://i.ibb.co/2Mkb8KC/sparrow.jpg',
    'https://i.ibb.co/7W9nN9v/pigeon.jpg',
    'https://i.ibb.co/YXYjzYh/crow.jpg'], 
    correct: 0 },
  { word: 'Queen', images: [
    'https://i.ibb.co/7W9nN9v/queen.jpg',
    'https://i.ibb.co/0rX5p3n/princess.jpg',
    'https://i.ibb.co/4PV6K4D/king.jpg',
    'https://i.ibb.co/YkZV9cH/prince.jpg'], 
    correct: 0 },
  { word: 'Rabbit', images: [
    'https://i.ibb.co/6Dg3VgD/rabbit.jpg',
    'https://i.ibb.co/2g5s3Y0/hamster.jpg',
    'https://i.ibb.co/WzLhY8c/mouse.jpg',
    'https://i.ibb.co/7CQVJNm/guinea.jpg'], 
    correct: 0 },
  { word: 'Sun Flower', images: [
    'https://i.ibb.co/7CQVJNm/sunflower.jpg',
    'https://i.ibb.co/9cLqK7H/rose.jpg',
    'https://i.ibb.co/3kWj5q0/tulip.jpg',
    'https://i.ibb.co/YkZV9cH/daisy.jpg'], 
    correct: 0 },
  { word: 'Tiger', images: [
    'https://i.ibb.co/XtQW8kQ/tiger.jpg',
    'https://i.ibb.co/5jK3L1R/lion.jpg',
    'https://i.ibb.co/k0yD9xT/bear.jpg',
    'https://i.ibb.co/YXYjzYh/panda.jpg'], 
    correct: 0 },
  { word: 'Unicorn', images: [
    'https://i.ibb.co/6Dg3VgD/unicorn.jpg',
    'https://i.ibb.co/PW2tVdP/horse.jpg',
    'https://i.ibb.co/WzLhY8c/pony.jpg',
    'https://i.ibb.co/3kWj5q0/zebra.jpg'], 
    correct: 0 },
  { word: 'Violin', images: [
    'https://i.ibb.co/9cLqK7H/violin.jpg',
    'https://i.ibb.co/7CQVJNm/guitar.jpg',
    'https://i.ibb.co/YkZV9cH/keyboard.jpg',
    'https://i.ibb.co/3kWj5q0/drum.jpg'], 
    correct: 0 },
  { word: 'Watch', images: [
    'https://i.ibb.co/XtQW8kQ/watch.jpg',
    'https://i.ibb.co/5jK3L1R/clock.jpg',
    'https://i.ibb.co/k0yD9xT/alarm.jpg',
    'https://i.ibb.co/YXYjzYh/timer.jpg'],
     correct: 0 },
  { word: 'Xylophone', images: [
    'https://i.ibb.co/9cLqK7H/xylophone.jpg'
    ,'https://i.ibb.co/7CQVJNm/guitar.jpg',
    'https://i.ibb.co/YkZV9cH/drum.jpg',
    'https://i.ibb.co/3kWj5q0/piano.jpg'], 
    correct: 0 },
  { word: 'Yak', images: [
    'https://i.ibb.co/6Dg3VgD/yak.jpg',
    'https://i.ibb.co/PW2tVdP/cow.jpg',
    'https://i.ibb.co/WzLhY8c/bull.jpg',
    'https://i.ibb.co/3kWj5q0/ox.jpg'], 
    correct: 0 },
  { word: 'Zebra', images: [
    'https://i.ibb.co/5jK3L1R/zebra.jpg',
    'https://i.ibb.co/XtQW8kQ/horse.jpg',
    'https://i.ibb.co/k0yD9xT/donkey.jpg',
    'https://i.ibb.co/YXYjzYh/pony.jpg'], 
    correct: 0 }
];

export default function WordImageMatch() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongSelected, setWrongSelected] = useState(false); // Track wrong answer

  const item = data[index];

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("zira"));
    if (femaleVoice) utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
  };

  const handleClick = (i) => {
    if (selected !== null) return;

    setSelected(i);

    if (i === item.correct) {
      setScore(score + 1);
      speak("Correct");
      setWrongSelected(false);
    } else {
      speak("Try Again");
      setWrongSelected(true);
    }
  };

  const next = () => {
    if (index < data.length - 1) {
      setSelected(null);
      setWrongSelected(false);
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  const retry = () => {
    setSelected(null);
    setWrongSelected(false);
  };

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
      <div className="word">Select the picture for: <strong>{item.word}</strong></div>
      <div className="grid">
        {item.images.map((img, i) => {
          let border = 'gray';
          if (selected !== null) border = i === item.correct ? 'green' : i === selected ? 'red' : 'gray';
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
        <button onClick={next} className="next-btn">Next</button>
      </div>
      <div className="buttons">
  <button onClick={() => navigate("/activities")} className="back-btn">
    Back
  </button>
  
</div>
    </div>
  );
}

import React,{useState, useEffect} from 'react'
import TinderCard from "react-tinder-card"
import "./tinderCard.css"
import axios from "./axios"

function TinderCards() {

    const [people,setPeople]=useState([
        // {
        //     name:'Ms Dhoni',
        //     url:"https://static.toiimg.com/thumb/msid-74157132,width-1200,height-900,resizemode-4/.jpg"
        // },
        // {
        //     name:'Virat Kholi',
        //     url:"https://i.guim.co.uk/img/media/b76d91ded27c0705d0cd97a77cf41d367c62c72b/0_63_1659_995/master/1659.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=a45883cecef2e8b076a8dd4bef7ce4fe"
        // },
        // {
        //     name:'Rohit Sharma',
        //     url:"https://www.mumbaiindians.com/static-assets/waf-images/e1/65/4c/4-3/592-444/vXNrwU1jYI.jpg"
        // },
        // {
        //     name:'Hardik Pandiya',
        //     url:"https://sportzwiki.com/wp-content/uploads/2021/02/hardik-pandya-afp_806x605_51512223431-1.jpg"
        // }
    ])

    useEffect(() => {
        async function fetchData(){
            const req = await axios.get('/tinder/cards')

            setPeople(req.data)
        }

        fetchData()
    }, [])

    const swiped =(direction, nameToDelete)=>{
        console.log(`Removing : ${nameToDelete}`)
    }

    const outOfFrame = (name)=>{
        console.log(`${name} left the screen`);
    }
    return (
        <div className="tinderCards">
            <div className="tinderCards__cardContainer">
                {people.map((person)=>(
                    <TinderCard 
                    className="swipe"
                    key={person.name}
                    preventSwipe={["up","down"]}
                    onSwipe={(dir)=>swiped(dir,person.name)}
                    onCardLeftScreen={()=>outOfFrame(person.name)}>
                        <div style={{backgroundImage:`url(${person.imgUrl})`}} className="card">
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    )
}

export default TinderCards

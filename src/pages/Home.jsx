import React from "react"
import Nav from "../components/Nav"
// import FontTest from "../components/FontTest"
import Hero from "../components/Hero"
import WhyChoose from "../components/WhyChoose"

const Home = ()=> {
    return (
        <div className="min-h-screen">
            <Nav/>
            {/* <FontTest/> */}
            <Hero/>
            <WhyChoose/>
        </div>
    )
}

export default Home

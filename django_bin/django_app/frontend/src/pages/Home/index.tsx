import './home.scss'
import logo from '@/assets/cyp_logo.png'

const Home = () => {
  return (
    <div className='bin'>

    
      <div className="hero">
        <img src={logo} alt="cyp_logo" className='cyp_img'/>
        <div>
          <h1>Welcome to Check Your Plate</h1>
          <h2>Your Ultimate* Food Nutrient Guide!</h2>
        </div>
        <div className='sigBin'>
            <p></p>
            <p id='sig'>A course porject by Yujia Cheng and Jiayi Zhang</p>
            <p>Dr. Kruger</p> 
            <p>ECE-569 Database Engineering</p>
            <p>Spring 2024, Rutgers University</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
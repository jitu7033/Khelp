import React from 'react'


const Footer = () => {
  return (
    <>

     {/* <section className="section testimonials">
          <h2>Review From user</h2>
          <div className="cards">
            {[
              {
                quote: "A terrific piece of praise",
                authorName: "John Doe",
                authorDescription: "CEO at Company A",
                authorImage: "URL_TO_AUTHOR1_IMAGE",
              },
              {
                quote: "A fantastic bit of feedback",
                authorName: "Jane Smith",
                authorDescription: "Marketing Head at Company B",
                authorImage: "URL_TO_AUTHOR2_IMAGE",
              },
              {
                quote: "A genuinely glowing review",
                authorName: "vijay Thalapathy",
                authorDescription: "Developer Advocate at Company C",
                authorImage: "https://www.nationalfilmawards.in/wp-content/uploads/2024/10/image-41-1024x768.png",
              },
            ].map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <p style={{fontStyle:'italic',fontSize:'18px',marginBottom: '12px',color:'#333'}}>{testimonial.quote}</p>
                <div className="author">
                  <img src={testimonial.authorImage} alt={testimonial.authorName} />
                  <div>
                    <strong>{testimonial.authorName}</strong>
                    <p>{testimonial.authorDescription}</p>
                  </div>
                </div>
              </div>
              ))}
          </div>  
        </section>
        <section className="send-message">
          <h2>Send Message</h2>
          <div className="buttons">
            <button className="primary">Button</button>
            <button className="secondary">Secondary button</button>
          </div>
        </section> */}

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <strong>Crop Bazaar</strong>
            <p>Your trusted crop marketplace</p>
            <div className="socials">
              {/* Replace with actual icons if needed */}
              <span>🌐</span> <span>📘</span> <span>🐦</span>
            </div>
          </div>

          <div>
            <strong>Marketplace</strong>
            <p>Explore Crops</p>
            <p>Top Sellers</p>
          </div>
          <div>
            <strong>Support</strong>
            <p>Help Center</p>
            <p>Contact Us</p>
          </div>
          <div>
            <strong>Company</strong>
            <p>About</p>
            <p>Terms & Privacy</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Crop Bazaar. All rights reserved.</p>
        </div>
      </footer>

    </>
  )
}

export default Footer
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <div className="footer-container">
        <p>All rights reserved</p>
        <p className="icons">
          <a href="https://www.linkedin.com/">
          <LinkedInIcon/> 
          </a>
          <a href="https://www.instagram.com/">
          <InstagramIcon/>
          </a>
          </p>
    </div>
  )
}

export default Footer
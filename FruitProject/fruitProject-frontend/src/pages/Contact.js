import "./Contact.css"

function Contact() {
    /**
 * show the Contact information of admin
 * @returns react element with conctact information of admin
 */
    return (
<div className="Contact_body">
      <h1 className="Title"> Contact us </h1>

      <div className="Contact_container">
        <div className="Contact_firstSection">
        <img src="https://www.elegantthemes.com/blog/wp-content/uploads/2019/01/shutterstock_577540945-960.jpg" width="300" height="300"/>
            <div class="Contact-card">
            <p>Call us <br/> 514-123-1234</p>
            </div>
        </div>  
        <div className="Contact_firstSection">
        <img src="https://blog.verisign.com/wp-content/uploads/VRSN_CompanyBrandedEmail_BlogImage8_201712-670x446.png" width="300" height="300"/>
            <div class="Contact-card">
            <p>Email us<br/> -1970670@johnabbottcollege.com <br/> -Eike@johnabbottcollege.com</p>
            </div>
        </div>
        <div className="Contact_firstSection">
            <img src="https://cdn.wccftech.com/wp-content/uploads/2017/03/Google-Maps.jpg" width="300" height="300"/>
            <div class="Contact-card">
            <p>Our Address <br/> 21 275 Rue Lakeshore Road, Sainte-Anne-de-Bellevue, QC H9X 3L9</p>
            </div>

        </div>
      </div>
    </div>
    );
  }
  
  export default Contact;
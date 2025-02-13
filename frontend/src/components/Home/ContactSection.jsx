import contactImg from "../../assets/images/contact-us.png";

const ContactSection = () => {
  return (
    <section className="py-2 lg:px-10 px-6">
      <h2 className="text-3xl mb-2 font-bold text-slate-600 text-center">
        Contact Us
      </h2>
      <div className="lg:flex items-center justify-center w-full">
        <div className="lg:w-1/2 w-full">
          <img src={contactImg} alt="contact Img" />
        </div>
        <div className="lg:w-1/2 w-full">
          {/* Contact Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Your Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input text-black focus:outline-none  bg-white border border-violet-600"
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Your Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input text-black focus:outline-none  bg-white border border-violet-600"
              />
            </div>

            {/* Subject */}
            <div className="form-control col-span-full">
              <label className="label">
                <span className="label-text text-black">Subject</span>
              </label>
              <input
                type="text"
                placeholder="Enter subject"
                className="input text-black focus:outline-none  bg-white border border-violet-600"
              />
            </div>

            {/* Message */}
            <div className="form-control col-span-full">
              <label className="label">
                <span className="label-text text-black">Message</span>
              </label>
              <textarea
                placeholder="Type your message here"
                className="textarea focus:outline-none textarea-bordered text-black  bg-white border border-violet-600 h-24"
              ></textarea>
            </div>
          </form>
          <button className="border shadow-lg bg-violet-600 hover:bg-black py-[8px] rounded font-thin text-[20px] w-full mt-4 mb-1 text-white hover:text-orange-500">
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

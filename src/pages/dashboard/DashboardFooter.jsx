export default function DashboardFooter() {
  const PageData ={
    title:" © 2022 Ats Services Pvt Ltd | All rights reserved"
  }
  return (
    <footer className="position-auto bg-dark text-white  text-md-center mt-2rem p-1" >
      <p>
       {PageData.title}
      </p>
    </footer>
  );
}

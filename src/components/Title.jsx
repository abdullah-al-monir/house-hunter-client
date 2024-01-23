const Title = ({ heading, subHeading }) => {
  return (
    <div className="text-center mb-10">
      <h2 className="font-bold text-4xl  md:text-5xl text-primary">
        {heading}
      </h2>
      <h4 className="font-semibold text-lg sm:text-xl md:text-2xl mt-2">
        {subHeading}
      </h4>
    </div>
  );
};

export default Title;

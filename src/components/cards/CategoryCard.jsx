const CategoryCard = ({categories}) => {
    return(<>
        {categories.map((category, index) => (
            <div key={index} className=" m-auto w-[250px] h-[250px] relative hover:cursor-pointer group my-5">
                <img className="rounded-lg" src={category.image}/>
                <h1 className="absolute bottom-3 left-3 text-white text-xl font-bold z-10 group-hover:text-2xl">{category.name}</h1>
            </div>
        ))}
    </>)
}

export default CategoryCard
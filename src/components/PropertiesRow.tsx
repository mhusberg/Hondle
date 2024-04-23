import PropertiesCard from '../components/PropertiesCard';
import { Hero } from '../App';


const PropertiesRow = ({hero, targetHero}:{
    hero: Hero;
    targetHero: Hero;
}) => {

    var genderClass = "fail";
    if (hero.Gender === targetHero.Gender) {
        genderClass = "success";
    }

    var attributeClass = "fail";
    if (hero.Attribute === targetHero.Attribute) {
        attributeClass = "success";
    }

    var roleClass = "fail";
    const heroRoles = hero.Role.split(" ");
    const targetHeroRoles = targetHero.Role.split(" ");
    if (hero.Role === targetHero.Role) {
        roleClass = "success";
    } else if (heroRoles.some(role => targetHeroRoles.includes(role))) {
        roleClass = "partial";
    }

    var sideClass = "fail";
    if (hero.Side === targetHero.Side) {
        sideClass = "success";
    }

    var rangeTypeClass = "fail";
    if (hero.RangeType === targetHero.RangeType) {
        rangeTypeClass = "success";
    }

    var complexityClass = "fail";
    if (hero.Complexity === targetHero.Complexity) {
        complexityClass = "success";
    }

    return (
        <div className="properties-row">
            <img className="hero-img-row" src={hero.ImagePath} alt={hero.Name}/>
            <PropertiesCard content={hero.Gender} colorClass={genderClass}></PropertiesCard>
            <PropertiesCard content={hero.Attribute} colorClass={attributeClass}></PropertiesCard>
            <PropertiesCard content={hero.Role} colorClass={roleClass}></PropertiesCard>
            <PropertiesCard content={hero.Side} colorClass={sideClass}></PropertiesCard>
            <PropertiesCard content={hero.RangeType} colorClass={rangeTypeClass}></PropertiesCard>
            <PropertiesCard content={hero.Complexity} colorClass={complexityClass}></PropertiesCard>
        </div>
    );
};

export default PropertiesRow;

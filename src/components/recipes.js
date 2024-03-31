import { View, Text,Image } from 'react-native'
import React,{useState} from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list'
import axios from 'axios';

export default function Recipes() {

    const [recipes, setRecipes] = useState([]);

    React.useEffect(() => {
        axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
            .then(response => {
                setRecipes(response.data.meals.slice(0, 3));
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }, []);

    console.log(recipes);

    return (
        <View className="mx-4 space-y-3">
            <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">Recipes</Text>
            <View>
                {
                    recipes.map((recipe) => {
                        return (
                            <View className="bg-white rounded-lg shadow-md" key={recipe.idMeal}>
                                <View>
                                    <Image source={{ uri: recipe.strMealThumb }} style={{ width: wp(100), height: hp(25) }} className="rounded-t-lg" />
                                </View>
                                <View className="p-4">
                                    <Text style={{ fontSize: hp(2) }} className="font-semibold text-neutral-600">{recipe.strMeal}</Text>
                                    <Text style={{ fontSize: hp(1.7) }} className="text-neutral-500">{recipe.strCategory}</Text>
                                </View>
                            </View>
                        );
                    })
                }
            </View>
        </View>
    );
}
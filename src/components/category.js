import { View, Text,ScrollView,TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { getCategoryData } from '../constants/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import useSWR from 'swr';
import PropTypes from 'prop-types';
import Animated,{FadeInDown} from 'react-native-reanimated';

const fetcher = (...args) => fetch(...args).then((res) => res.json());      

Category.propTypes = {
        activeCategory: PropTypes.string.isRequired,
        setActiveCategory: PropTypes.func.isRequired,
};

export default function Category(activeCategory,setActiveCategory) {

    const {
        data: categories,
        error,
        isValidating,
      } = useSWR('https://www.themealdb.com/api/json/v1/1/categories.php', fetcher);
    
      if (error) return <Text className='failed'>failed to load</Text>;
      if (isValidating) return <Text className="Loading">Loading...</Text>;


  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="space-x-4"
    contentContainerStyle={{paddingHorizontal:15}}
    >
        {
            categories.categories.map((category) => {
                let isActive = category.strCategory == activeCategory.activeCategory;
                let activeButtonClass = isActive? 'bg-amber-400' : 'bg-black/10';
                let abmer = 'bg-amber-400';
                return(
                    <TouchableOpacity 
                        key={category.idCategory} 
                        className="flex items-center space-y-1"
                        onPress={() => activeCategory.setActiveCategory(category.strCategory)}
                    >
                        {
                            isActive? 
                            <View className="rounded-full p-[6px] bg-amber-400">
                            <Image 
                                source={{uri:category.strCategoryThumb}} 
                                style={{width:hp(6), height:hp(6)}}
                                className="rounded-full"
                            />
                            </View>: 

                            <View className="rounded-full p-[6px] bg-black/10">
                                <Image 
                                source={{uri:category.strCategoryThumb}} 
                                style={{width:hp(6), height:hp(6)}}
                                className="rounded-full"
                                />
                            </View>
                        }

                        <Text className="text-neutral-600" style={{fontSize: hp(1.6)}}>
                            {category.strCategory}
                        </Text>
                    </TouchableOpacity>
                )    
            })
        }
    </ScrollView>

    </Animated.View>
  )

}
import { View, Text,ScrollView,TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { getCategoryData } from '../constants/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Category(avtiveCategory,setActiveCategory) {

    const {
        data: categories,
        error,
        isValidating,
      } = useSWR('https://www.themealdb.com/api/json/v1/1/categories.php', fetcher);
    
      if (error) return <Text className='failed'>failed to load</Text>;
      if (isValidating) return <Text className="Loading">Loading...</Text>;
    
  return (
    <View>
    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="space-x-4"
    contentContainerStyle={{paddingHorizontal:15}}
    >
        {
            categories.categories.map((category) => {
                let isActive = avtiveCategory === category.strCategory;
                return(
                    <TouchableOpacity 
                        key={category.idCategory} 
                        className="flex items-center space-y-1"
                        onPress={() => setActiveCategory(category.strCategory)}
                    >
                        <View className="rounded-full p-[6px]">
                            <Image 
                            source={{uri:category.strCategoryThumb}} 
                            style={{width:hp(6), height:hp(6)}}
                            className="rounded-full"
                            />
                        </View>
                        <Text className="text-neutral-600" style={{fontSize: hp(1.6)}}>
                            {category.strCategory}
                        </Text>
                    </TouchableOpacity>
                )    
            })
        }
    </ScrollView>

    </View>
  )

}
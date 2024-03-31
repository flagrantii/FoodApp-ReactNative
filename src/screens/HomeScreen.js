import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View,ScrollView,Image, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Category from '../components/category';
import Recipes from '../components/recipes';



export default function HomeScreen() {

  const [activeCategory, setActiveCategory] = useState("Beef");

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:50}}
        className="space-y-6 pt-14"
      >

        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image source={require('../../assets/images/profile.png')} style={{width:hp(5.5),height:hp(5)}} />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text className="text-neutral-600" style={{fontSize:hp(1.7)}}>Hello, Shokubutsu</Text>
          <View>
            <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">Make your owm food</Text>
          </View>
          <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>
        

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput 
          placeholder="Search any rescipe"
          placeholderTextColor={'gray'}
          style={{fontSize:hp(1.7)}}
          className="flex-1 text-base mb-1 pl-3 tracking-wider"
           />
           <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} color="gray" strokeWidth={3} />
           </View>
        </View>
        
        <View>
          <Category activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </View>

        <View>
          <Recipes/>
        </View>

      </ScrollView>
    </View>
  );
}


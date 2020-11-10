import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Animated, { Easing } from 'react-native-reanimated';
import FBSearchBar from './FBSearchBar';

// Calculate window size
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const FBSearchBarTest = () => {
  const [isSearch, setIsSearch] = useState({
    isFocused: false,
    keyword: '',
  });

  const { Value, timing } = Animated;

  // animation values
  const _input_box_translate_x = new Value(width);
  const _back_button_opacity = new Value(0);
  const _content_translate_y = new Value(height);
  const _content_opacity = new Value(0);

  const input = useRef(null);

  const _onFocus = () => {
    // update state
    setIsSearch((prevState) => ({ ...prevState, isFocused: true }));
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    };

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    };

    // run animation
    timing(_input_box_translate_x, input_box_translate_x_config).start();
    timing(_back_button_opacity, back_button_opacity_config).start();
    timing(_content_translate_y, content_translate_y_config).start();
    timing(_content_opacity, content_opacity_config).start();

    // force focus
    input.current.focus();
  };

  const _onBlur = () => {
    // update state
    setIsSearch((prevState) => ({ ...prevState, isFocused: false }));
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: width,
      easing: Easing.inOut(Easing.ease),
    };

    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: height,
      easing: Easing.inOut(Easing.ease),
    };

    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };

    // run animation
    timing(_input_box_translate_x, input_box_translate_x_config).start();
    timing(_back_button_opacity, back_button_opacity_config).start();
    timing(_content_translate_y, content_translate_y_config).start();
    timing(_content_opacity, content_opacity_config).start();

    // force blur
    input.current.blur();
  };

  return (
    <View style={{ flex: 1, display: 'flex', height: '100%' }}>
      <SafeAreaView style={styles.header_safe_area}>
        <View style={styles.header}>
          <View style={styles.header_inner}>
            <View>
              {/* <Image
                source={require('../assets/images/ppt-logo-kota.png')}
                style={{ width: 152, height: 30 }}
              /> */}
            </View>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor={'#ccd0d5'}
              onPress={_onFocus}
              style={styles.search_icon_box}>
              <Icon name="search" size={22} color="#000000" />
            </TouchableHighlight>
            <Animated.View
              style={[
                styles.input_box,
                { transform: [{ translateX: _input_box_translate_x }] },
              ]}>
              <Animated.View style={{ opacity: _back_button_opacity }}>
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor={'#ccd0d5'}
                  onPress={_onBlur}
                  style={styles.back_icon_box}>
                  <Icon name="chevron-left" size={22} color="#000000" />
                </TouchableHighlight>
              </Animated.View>
              <TextInput
                ref={input}
                placeholder="Search Facebook"
                clearButtonMode="always"
                value={isSearch.keyword}
                onChangeText={(value) =>
                  setIsSearch((prevState) => ({ ...prevState, keyword: value }))
                }
                style={styles.input}
              />
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: _content_opacity,
            transform: [{ translateY: _content_translate_y }],
          },
        ]}>
        <SafeAreaView style={styles.content_safe_area}>
          <View style={styles.content_inner}>
            <View style={styles.separator} />

            <View style={styles.image_placeholder_container}>
              <Image
                source={require('../assets/images/ppt-logo-kota.png')}
                style={styles.image_placeholder}
              />
              <Text style={styles.image_placeholder_text}>
                Enter a few words{'\n'}
                to search on Facebook
              </Text>
            </View>

            <ScrollView>
              <View style={styles.search_item}>
                <Icon
                  style={styles.item_icon}
                  name="search"
                  size={16}
                  color="#cccccc"
                />
                <Text>Fake result 1</Text>
              </View>
              <View style={styles.search_item}>
                <Icon
                  style={styles.item_icon}
                  name="search"
                  size={16}
                  color="#cccccc"
                />
                <Text>Fake result 2</Text>
              </View>
              <View style={styles.search_item}>
                <Icon
                  style={styles.item_icon}
                  name="search"
                  size={16}
                  color="#cccccc"
                />
                <Text>Fake result 3</Text>
              </View>
              <View style={styles.search_item}>
                <Icon
                  style={styles.item_icon}
                  name="search"
                  size={16}
                  color="#cccccc"
                />
                <Text>Fake result 4</Text>
              </View>
              <View style={styles.search_item}>
                <Icon
                  style={styles.item_icon}
                  name="search"
                  size={16}
                  color="#cccccc"
                />
                <Text>Fake result 5</Text>
              </View>
            </ScrollView>

            {isSearch.keyword === '' ? (
              <View style={styles.image_placeholder_container}>
                <Image
                  source={require('../assets/images/ppt-logo-kota.png')}
                  style={styles.image_placeholder}
                />
                <Text style={styles.image_placeholder_text}>
                  Enter a few words{'\n'}
                  to search on Facebook
                </Text>
              </View>
            ) : (
              <ScrollView>
                <View style={styles.search_item}>
                  <Icon
                    style={styles.item_icon}
                    name="search"
                    size={16}
                    color="#cccccc"
                  />
                  <Text>Fake result 1</Text>
                </View>
                <View style={styles.search_item}>
                  <Icon
                    style={styles.item_icon}
                    name="search"
                    size={16}
                    color="#cccccc"
                  />
                  <Text>Fake result 2</Text>
                </View>
                <View style={styles.search_item}>
                  <Icon
                    style={styles.item_icon}
                    name="search"
                    size={16}
                    color="#cccccc"
                  />
                  <Text>Fake result 3</Text>
                </View>
                <View style={styles.search_item}>
                  <Icon
                    style={styles.item_icon}
                    name="search"
                    size={16}
                    color="#cccccc"
                  />
                  <Text>Fake result 4</Text>
                </View>
                <View style={styles.search_item}>
                  <Icon
                    style={styles.item_icon}
                    name="search"
                    size={16}
                    color="#cccccc"
                  />
                  <Text>Fake result 5</Text>
                </View>
              </ScrollView>
            )}
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

export default FBSearchBarTest;


const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000,
  },
  header: {
    height: 50,
    paddingHorizontal: 16,
  },
  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  search_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#e4e6eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_box: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    width: width - 32,
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#e4e6eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  content: {
    width: width,
    height: height,
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 999,
  },
  content_safe_area: {
    flex: 1,
    backgroundColor: 'white',
  },
  content_inner: {
    flex: 1,
    paddingTop: 50,
  },
  separator: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#e6e4eb',
  },
  image_placeholder_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '-50%',
  },
  image_placeholder: {
    width: 150,
    height: 113,
    alignSelf: 'center',
  },
  image_placeholder_text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5,
  },
  search_item: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e4eb',
    marginLeft: 16,
  },
  item_icon: {
    marginRight: 15,
  },
});


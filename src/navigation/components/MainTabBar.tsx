import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@emotion/react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import styled from '@emotion/native';

import {Text} from '$src/kit/components';

import {useGetCartItemsQuery} from '$features/cart/cartApi';

import {FontistoIcon, IonIcon} from '$kit/components';

export const MainTabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  const theme = useTheme();
  const {data = []} = useGetCartItemsQuery();
  const cartCounter = data.reduce<number>(
    (acc, cartItem) => acc + cartItem.quantity,
    0,
  );
  return (
    <Container>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconColor = isFocused
          ? theme.color.tabbarTint
          : theme.color.tabbarInactive;

        let icon = null;
        switch (route.name) {
          case 'Dashboard':
            icon = (
              <IonIcon name="md-home" size={theme.size.x4} color={iconColor} />
            );
            break;
          case 'Favourites':
            icon = (
              <IonIcon
                name="heart-sharp"
                size={theme.size.x4}
                color={iconColor}
              />
            );
            break;
          case 'Cart':
            icon = (
              <View>
                <FontistoIcon
                  name="shopping-basket"
                  size={theme.size.x4}
                  color={iconColor}
                />
                {cartCounter > 0 && (
                  <IconView>
                    <Counter>{cartCounter}</Counter>
                  </IconView>
                )}
              </View>
            );
            break;

          default:
            break;
        }
        return (
          <Tab key={route.name} onPress={onPress} onLongPress={onLongPress}>
            {icon}
          </Tab>
        );
      })}
    </Container>
  );
};

const Container = styled.View(({theme}) => ({
  flexDirection: 'row',
  backgroundColor: theme.color.tabbar,
  borderRadius: theme.size.x5,
  padding: theme.size.x2,
  marginBottom: 0,
  margin: theme.size.x2,
  position: 'absolute',
  bottom: theme.insets.bottom,
  left: 0,
  right: 0,
}));
const Tab = styled.TouchableOpacity({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});
const Counter = styled(Text)(({theme}) => ({
  color: theme.color.background,
  fontSize: theme.size.x2,
}));
const IconView = styled.View(({theme}) => ({
  borderRadius: theme.size.x2,
  backgroundColor: theme.color.tint,
  height: theme.size.x3,
  width: theme.size.x3,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: -theme.size.x1,
  right: -theme.size.x1,
}));

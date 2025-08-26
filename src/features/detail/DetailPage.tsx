import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useRef } from 'react';
import {
  DetailNavigationParams,
  RootNavigationProps,
} from 'src/navigation/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IDetailView } from './mvp/detailContract';
import { DetailPresenter } from './mvp/detailPresenter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/app/rootReducer';
import tinycolor from 'tinycolor2';
import CardType from '@components/CardType';
import { colors } from '@themes/colors';
import Stat from './components/Stat';
import Label from './components/Label';
import Evolution from './components/Evolution';

const DetailPage = () => {
  const {
    params: { pokemonId },
  } = useRoute<DetailNavigationParams>();
  const { navigate } = useNavigation<RootNavigationProps>();
  const presenterRef = useRef<DetailPresenter | null>(null);
  const dispatch = useDispatch();
  const { loading, error, pokemon } = useSelector((s: RootState) => s.detail);

  const viewImpl = useMemo<IDetailView>(
    () => ({
      showToast: (m: string) => console.log(m),
      // showToast: (m: string) => ToastAndroid.show(m, ToastAndroid.SHORT),
    }),
    [],
  );

  const isLight = useMemo(() => {
    if (pokemon) {
      const tinyColor = tinycolor(pokemon.colors.name);
      return tinyColor.isLight();
    }
    return false;
  }, [pokemon]);

  if (!presenterRef.current)
    presenterRef.current = new DetailPresenter({ dispatch });
  console.log('pokemonId', pokemonId);
  useEffect(() => {
    if (pokemonId) {
      presenterRef.current!.attach(viewImpl);
      presenterRef.current!.onInit(pokemonId || '');
    }
    return () => presenterRef.current!.detach();
  }, [viewImpl, pokemonId]);

  useEffect(() => {
    if (error) viewImpl.showToast(error);
  }, [error, viewImpl]);

  if (!pokemon) return null;

  const {
    sprites: { other, front_default, back_default, back_shiny, front_shiny },
    name,
    id,
    colors: { name: pokemonColor },
    height,
    weight,
    abilities,
    base_experience,
    stats,
  } = pokemon;

  const sprites = [front_default, back_default, front_shiny, back_shiny];

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.black} />
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Image
            source={{
              uri: other['official-artwork'].front_default,
            }}
            style={styles.image}
          />
          <View style={styles.descContainer}>
            <Text>{`#${id}`}</Text>
            <Text style={styles.textTitle}>{name}</Text>
            <View style={styles.typeContainer}>
              {pokemon.types.map((type, index) => (
                <CardType
                  key={index}
                  text={type.type.name}
                  isLight={!isLight}
                  backgroundColor={pokemonColor}
                  fontSize={12}
                />
              ))}
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Stat stats={stats} color={pokemonColor} isLight={!isLight} />
          <View style={styles.detailContainer}>
            <Label title="Height" value={`${height / 10} m`} />
            <Label title="Weight" value={`${weight / 10} m`} />
            <Label title="Base Experience" value={base_experience.toString()} />
            <Label
              title="Abilities"
              value={abilities.map(ability => ability.ability.name).join(', ')}
            />
            <Label title="Sprites" />
            <View style={styles.spriteContainer}>
              {sprites.map((sprite, index) => (
                <Image
                  key={index}
                  source={{
                    uri: sprite,
                  }}
                  resizeMode="cover"
                  style={styles.imageSprite}
                />
              ))}
            </View>
          </View>
          <Evolution />
        </View>
      </ScrollView>
      {/* <FloatingCompare
        onPress={() =>
          navigate('Compare', { pokemonId: String(pokemonDetail.id) || '' })
        }
      /> */}
    </SafeAreaView>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 8,
    paddingTop: 16,
    flexDirection: 'row',
    zIndex: 99,
  },
  image: {
    width: 150,
    height: 150,
  },
  descContainer: {
    marginLeft: 16,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  typeContainer: {
    flexDirection: 'row',
    marginTop: 4,
    flex: 1,
    flexWrap: 'wrap',
    maxWidth: 240,
  },
  contentContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopEndRadius: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 40,
    marginTop: -40,
  },
  spriteContainer: {
    flexDirection: 'row',
  },
  imageSprite: {
    width: 70,
    height: 70,
  },
  detailContainer: {
    padding: 8,
    borderWidth: 1,
    borderColor: colors.shade75,
    borderRadius: 8,
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.shade50,
    zIndex: 10,
    opacity: 0.4,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

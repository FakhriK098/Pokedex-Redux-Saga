import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/app/rootReducer';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from 'src/navigation/types';
import { Pokemon } from '@models/pokedex';
import CardPokemon from './components/CardPokemon';
import EmptyContainer from './components/EmptyContainer';
import { colors } from '@themes/colors';
import CounteFilter from './components/CounteFilter';
import images from '@images';
import { HomePresenter } from './mvp/homePresenter';
import { IHomeView } from './mvp/homeContract';
import ModalFilter from '@features/modalFilter/ModalFilter';
import { Modalize } from 'react-native-modalize';

const HomePage = () => {
  const { navigate } = useNavigation<RootNavigationProps>();
  const dispatch = useDispatch();
  const state = useSelector((s: RootState) => s.home);
  // presenter instance (stable ref)
  const presenterRef = useRef<HomePresenter | null>(null);
  // avoid duplicate onEndReached calls
  const canLoadMoreRef = useRef(true);
  const modalFilterRef = useRef<Modalize>(null);

  // adapter untuk kontrak View
  const viewImpl = useMemo<IHomeView>(
    () => ({
      navigateToDetail: id => navigate('Detail', { pokemonId: String(id) }),
      navigateToSearch: () => navigate('Search'),
      openModalFilter: () => modalFilterRef.current?.open(),
    }),
    [navigate],
  );

  // getState yang hanya expose potongan state sesuai kontrak
  const getState = useCallback(
    () => ({
      items: state.pokemonList,
      loading: state.loading,
      error: state.error,
      offset: state.offset,
    }),
    [state],
  );

  if (!presenterRef.current) {
    presenterRef.current = new HomePresenter({ dispatch, getState });
  }

  // manage attach/detach of the view
  useEffect(() => {
    const presenter = presenterRef.current;
    if (!presenter) return;
    presenter.attach(viewImpl);
    presenter.onInit();
    return () => presenter.detach();
  }, [viewImpl]);

  const data = useMemo(() => {
    if (state.filterPokemonList.length > 0) {
      return state.filterPokemonList;
    }

    return state.pokemonList;
  }, [state.filterPokemonList, state.pokemonList]);

  const handleSearch = () => {
    presenterRef.current!.onSearchPress();
  };

  const handleFilter = () => {
    presenterRef.current?.onFilterPress();
  };

  const renderEmpty = () => {
    return <EmptyContainer />;
  };

  const renderItem = ({ item, index }: { item: Pokemon; index: number }) => {
    return <CardPokemon key={`pokemon-${item.id}-${index}`} item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.searchContainer} onPress={handleSearch}>
          <Text style={styles.textSearch}>Search</Text>
        </Pressable>
        <Pressable style={styles.filterContainer} onPress={handleFilter}>
          <CounteFilter count={state.countFilter} />
          <Image source={images.filter} style={styles.imageFilter} />
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item, index) => `pokemon-${item.id}-${index}`}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!state.loading && canLoadMoreRef.current) {
            canLoadMoreRef.current = false;
            presenterRef.current?.onEndReached(state.pokemonList.length);
          }
        }}
        onMomentumScrollBegin={() => {
          canLoadMoreRef.current = true;
        }}
        showsVerticalScrollIndicator={false}
        refreshing={state.loading}
        onRefresh={() => presenterRef.current?.onRefresh()}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={
          state.loading ? (
            <View style={{ padding: 16 }}>
              <ActivityIndicator />
            </View>
          ) : null
        }
      />
      <ModalFilter modalRef={modalFilterRef} />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchContainer: {
    flex: 0.9,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.black,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.white,
  },
  filterContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.black,
    paddingVertical: 6,
    backgroundColor: colors.white,
  },
  textSearch: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
  },
  imageFilter: {
    width: 24,
    height: 24,
  },
});

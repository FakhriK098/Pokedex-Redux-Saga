import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useRef } from 'react';
import { colors } from '@themes/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/app/rootReducer';
import { searchFilter } from '@selectors/searchSelectors';
import { SearchPresenter } from './mvp/searchPresenter';
import { PokemonResult } from '@models/pokedex';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from 'src/navigation/types';
import { BASE_URL } from '@env';
import { ISearchView } from './mvp/searchContract';

const SearchPage = () => {
  const { navigate } = useNavigation<RootNavigationProps>();
  const dispatch = useDispatch();
  const { loading, error, query } = useSelector((s: RootState) => s.search);
  const results = useSelector(searchFilter);
  const presenterRef = useRef<SearchPresenter | null>(null);
  const [tempQuery, setTempQuery] = React.useState('');

  const viewImpl = useMemo<ISearchView>(
    () => ({
      showToast: (m: string) => ToastAndroid.show(m, ToastAndroid.SHORT),
      navigateToDetail: (id: string) => navigate('Detail', { pokemonId: id }),
    }),
    [navigate],
  );

  if (!presenterRef.current)
    presenterRef.current = new SearchPresenter({ dispatch });

  useEffect(() => {
    presenterRef.current!.attach(viewImpl);
    presenterRef.current!.onInit();
    return () => presenterRef.current!.detach();
  }, [viewImpl]);

  useEffect(() => {
    if (error) viewImpl.showToast(error);
  }, [error, viewImpl]);

  const handleOnPress = (item: PokemonResult) => {
    const id = item.url.replace(`${BASE_URL}/pokemon/`, '');
    presenterRef.current!.onItemPress(id);
  };

  const handleClear = () => {
    presenterRef.current!.onClearQuery();
    setTempQuery('');
  };

  const onChangeText = (text: string) => {
    setTempQuery(text);
    presenterRef.current!.onChangeQuery(text);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: PokemonResult;
    index: number;
  }) => {
    return (
      <Pressable
        key={`pokemon-${item.name}-${index}`}
        style={styles.itemContainer}
        onPress={() => handleOnPress(item)}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </Pressable>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or id..."
            value={tempQuery}
            onChangeText={onChangeText}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            autoFocus
          />
          {query && query?.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item, index) => `pokemon-${item.name}-${index}`}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.shade75,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.shade800,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    fontSize: 18,
    color: colors.shade800,
  },
  itemContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.shade75,
  },
  itemText: {
    fontSize: 16,
    color: colors.black,
  },
});

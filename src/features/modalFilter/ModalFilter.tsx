import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ModalFilterProps } from '@types/home';
import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/app/rootReducer';
import { colors } from '@themes/colors';
import SectionFilter from './components/SectionFilter';
import { FilterPresenter } from './mvp/filterPresenter';

const ModalFilter = ({ modalRef }: ModalFilterProps) => {
  const state = useSelector((s: RootState) => s.home);
  const dispatch = useDispatch();

  const presenterRef = useRef<FilterPresenter | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedMove, setSelectedMove] = useState('');

  if (!presenterRef.current)
    presenterRef.current = new FilterPresenter({ dispatch });

  useEffect(() => {
    presenterRef.current!.onInit();
  }, []);
  const onOpen = () => {
    setSelectedColor(state.colorSelected || '');
    setSelectedType(state.typeSelected || '');
    setSelectedMove(state.moveSelected || '');
  };

  const handleClearFilter = () => {
    presenterRef.current!.onClearFilter();
    setSelectedColor('');
    setSelectedType('');
    setSelectedMove('');
    modalRef.current?.close();
  };

  const handleApplyFilter = () => {
    presenterRef.current!.onApplyFilter({
      colorSelected: selectedColor,
      typeSelected: selectedType,
      moveSelected: selectedMove,
    });
    modalRef.current?.close();
  };

  if (!state.filters) return null;
  const { colors: pokemonColors, moves, types } = state.filters;

  return (
    <Modalize
      ref={modalRef}
      adjustToContentHeight
      handlePosition="inside"
      onOpen={onOpen}
      HeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.titleHeader}>Filter</Text>
        </View>
      }
    >
      <View style={styles.contentContainer}>
        <SectionFilter
          title="Move"
          options={moves.results.map(item => item.name) || []}
          onSelected={setSelectedMove}
          selected={selectedMove}
        />
        <SectionFilter
          title="Type"
          options={types.results.map(item => item.name) || []}
          onSelected={setSelectedType}
          selected={selectedType}
        />
        <SectionFilter
          title="Color"
          options={pokemonColors.results.map(item => item.name) || []}
          onSelected={setSelectedColor}
          selected={selectedColor}
        />
        <View style={styles.containerButton}>
          <View style={styles.button}>
            <Button title="Clear" onPress={handleClearFilter} color="red" />
          </View>
          <View style={styles.button}>
            <Button title="Apply" onPress={handleApplyFilter} color="blue" />
          </View>
        </View>
      </View>
    </Modalize>
  );
};

export default ModalFilter;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.shade75,
  },
  titleHeader: {
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    paddingVertical: 16,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: Platform.select({ ios: 16, android: 0 }),
  },
  button: {
    width: '48%',
  },
});

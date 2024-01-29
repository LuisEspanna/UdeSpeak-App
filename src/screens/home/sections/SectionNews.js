import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useNews from '../../../hooks/useNews';
import { useState, useEffect } from 'react';
import NewsCard from '../../../components/NewsCard';


export default function SectionNews(props) {
  const { getAllNews } = useNews();
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true);
      const localItems = await getAllNews();
      setNews(localItems);
      setIsLoading(false);
    }
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {
        news?.length > 0 && <Text style={styles.sectionTitle}>Noticias</Text>
      }
      {
        news?.map((item) =>
          <NewsCard key={item.id} {...item} />
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
    position: 'relative',
    padding: 2
  },
  languageItem: {
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 7,
    height: 100,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  languageImage: {
    height: 63,
    width: 63,
    borderRadius: 37
  },
  languageText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0FB4B9'
  },
  sectionTitle:{
    marginTop: 26,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0FB4B9'
  }
});
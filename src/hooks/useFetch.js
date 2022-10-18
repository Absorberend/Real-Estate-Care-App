import {useState, useEffect} from 'react';
import { projectFirestore } from '../firebase/config.js';

export default function useFetch() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    
    useEffect(() => {
        setLoading(true)
    
        const unsub = projectFirestore.collection('reports').onSnapshot(snapshot => {
          if (snapshot.empty) {
            setError('No reports to load')
            setLoading(false)
          } else {
            let results = []
            snapshot.docs.forEach(doc => {
              results.push({ ...doc.data(), id: doc.id })
            })
            setData(results)
            setLoading(false)
          }
        }, err => {
          setError(err.message)
          setLoading(false)
        })
    
        return () => unsub()
    
      }, [])

      useEffect(() => {
        setLoading(true)
    
        const unsub = projectFirestore.collection('users').onSnapshot(snapshot => {
          if (snapshot.empty) {
            setError('No users to load')
            setLoading(false)
          } else {
            let results = []
            snapshot.docs.forEach(doc => {
              results.push({ ...doc.data(), id: doc.id })
            })
            setUsers(results)
            setLoading(false)
          }
        }, err => {
          setError(err.message)
          setLoading(false)
        })
    
        return () => unsub()
    
      }, [])


    function post(collection, doc) {
        try {
            projectFirestore.collection(collection).add(doc)
        } catch(err) {
            console.error(err);
        }
     
    }

    function put(collection, id, body) {
        try {
            projectFirestore.collection(collection).doc(id).update(body)
        } catch(err) {
            console.error(err);
        }
    }


    function del(collection, id) {
        try {
            projectFirestore.collection(collection).doc(id).delete()
        } catch(err) {
            console.error(err);
        } 
    }

    return { post, put, del, loading, data, users, error };
}

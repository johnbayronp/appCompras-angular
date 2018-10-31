import { Component , OnInit} from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  ngOnInit() {
    /** Inicializamos nuestra base de datos  */
    firebase.initializeApp({
      apiKey: "AIzaSyDE-kexdzMmga7hKF2B2reulEzE1KcXy1w",
      authDomain: "comprasapp-3f8b4.firebaseapp.com"
    });
  }


}

export class Course{

    // בניית מחלקה
    // לא מגדירים מאפיינים
    // אלא רק בנאי - הפרמטרים שהבנאי מקבל
    // הם יהיו מאפייני המחלקה
    // ולכן יש לכתוב להם הרשאת גישה
    // ? משתנה של אחובה להכניס לו ערך נוסיף 
    // כל הערכים שאינם חובה חייבים להיות כתובים בסוף
    constructor(public id?:number,public nameC?:string, public nameT?:string,public sAge?:number,public eAge?:number,public long?:number
        ,public countM?:number, public price?:number,public dateS?:Date,public note?:string)
        // ניתן לתת ערך ברירת מחדל - גם אם הוא בא אחרי השדות שאינם חובה
        {
    }
}
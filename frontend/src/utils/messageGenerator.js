const messages = {
  fresh: [
    "เพิ่งจบใหม่ๆ ยังคิดถึงบรรยากาศในมหาวิทยาลัยใช่มั้ย? 🎓",
    "ยินดีด้วยนะที่จบการศึกษา! รุ่นน้องใหม่เลย ✨",
    "ยังไม่ทันห่างจากรั้วมหาวิทยาลัยเลย ความทรงจำยังใหม่อยู่ใช่มั้ย? 🌟",
  ],

  early: [
    "จบมา {X} ปีแล้ว ชีวิตการทำงานเป็นยังไงบ้าง? 💼",
    "ห่างจากรั้วมหาวิทยาลัยมา {X} ปี คงคิดถึงเพื่อนๆ บ้างนะ 🏫",
    "{X} ปีผ่านไป ยังเป็นลูกศิษย์ SIT ที่ภาคภูมิใจอยู่เสมอ 💚",
  ],

  mid: [
    "ไม่ได้เจอกันตั้ง {X} ปีแล้ว เวลาผ่านไปเร็วจัง! ⏰",
    "จากน้องใหม่วันวาน ตอนนี้คงเป็นมืออาชีพแล้วสินะ 🌟",
    "{X} ปีผ่านไป ยังคิดถึงวันที่เรานั่งเรียนด้วยกันอยู่เลย 📚",
    "ผ่านมาเกือบทศวรรษแล้ว คิดถึงวันที่นั่งทำโปรเจคร่วมกันไหม? 💻",
  ],

  veteran: [
    "ผ่านมาเกือบทศวรรษครึ่งแล้ว ตั้ง {X} ปี! คิดถึงยุคที่เราเป็นนักศึกษากันเลย 💭",
    "{X} ปีแล้ว... เวลาผ่านไปเร็วมากจนแทบไม่อยากเชื่อ 🕰️",
    "นานแค่ไหนแล้วนะที่ไม่ได้กลับไปเยี่ยม SIT... {X} ปีเต็มๆ! 🏛️",
    "ตั้ง {X} ปีแล้ว ความเป็น SIT ยังฝังอยู่ในใจใช่มั้ย? ❤️",
  ],

  senior: [
    "ไม่อยากจะเชื่อเลยว่าผ่านมา {X} ปีแล้ว ความทรงจำยังชัดเจนเหมือนเมื่อวาน 💫",
    "{X} ปี... แทบครึ่งชีวิตแล้วนะ! แต่ความเป็น SIT ยังอยู่ในใจเสมอ ❤️",
    "นานมากจนเด็กสมัยเราเรียน ตอนนี้ลูกคงโตเป็นหนุ่มเป็นสาวแล้วมั้ง 👨‍👩‍👧",
    "เกือบ 2 ทศวรรษแล้ว! {X} ปีที่คุณยังคงเป็นส่วนหนึ่งของครอบครัว SIT 🏫",
  ],

  legendary: [
    "ผ่านมาเกือบ {X} ปีแล้ว! พี่รุ่นเก๋าของคณะเลย 🎖️",
    "{X} ปี... ช่วงเวลาที่ยาวนานจนอาจลืมใบหน้าบางคน แต่ความรู้สึกดีๆ ยังคงอยู่ 🌅",
    "สองทศวรรษผ่านไป ตอนนี้หลานคนโตคงใกล้เข้ามหาวิทยาลัยแล้วมั้ย? 👴",
    "{X} ปีแห่งความภาคภูมิใจในชื่อ SIT ที่เราสร้างมา 🏆",
  ],

  pioneer: [
    "ตำนานรุ่นเก๋าของ SIT! ผ่านมาตั้ง {X} ปี เป็นพยานประวัติศาสตร์ของคณะเลย 🏆",
    "{X} ปีแล้วหรอ!? คุณคือหนึ่งในผู้บุกเบิกของคณะ SIT เลยนะ! 👑",
    "มากกว่า {X} ปี... คุณคือตำนานที่รุ่นน้องทุกคนควรรู้จัก! 🌟",
    "ผู้บุกเบิกตัวจริง! {X} ปีที่คุณเป็นส่วนหนึ่งของประวัติศาสตร์ SIT 🎯",
  ],
};

/**
 * Generate a heartwarming message based on years since graduation
 * @param {number} yearsSinceGraduation
 * @returns {string}
 */
export function generateHeartwarmingMessage(yearsSinceGraduation) {
  let category;

  if (yearsSinceGraduation <= 2) {
    category = "fresh";
  } else if (yearsSinceGraduation <= 5) {
    category = "early";
  } else if (yearsSinceGraduation <= 10) {
    category = "mid";
  } else if (yearsSinceGraduation <= 15) {
    category = "veteran";
  } else if (yearsSinceGraduation <= 20) {
    category = "senior";
  } else if (yearsSinceGraduation <= 30) {
    category = "legendary";
  } else {
    category = "pioneer";
  }

  const categoryMessages = messages[category];
  const randomIndex = Math.floor(Math.random() * categoryMessages.length);
  const message = categoryMessages[randomIndex];

  return message.replace(/\{X\}/g, yearsSinceGraduation.toString());
}

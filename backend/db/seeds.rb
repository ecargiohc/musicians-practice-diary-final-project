# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# for user:
# Faker::TvShows::RickAndMorty.character
# for media:

User.destroy_all
Task.destroy_all
UserTask.destroy_all
TaskNote.destroy_all
SubTask.destroy_all
Media.destroy_all
Comment.destroy_all

marc = User.create(username: "Marc", password: "111", instrument: "violin", resume: "link.com", photo: "link.jpg")
ulysses = User.create(username: "Ulysses", password: "222", instrument: "viola", resume: "link.com", photo: "link.jpg")
sisley = User.create(username: "Sisley", password: "333", instrument: "cello", resume: "link.com", photo: "link.jpg")
katia = User.create(username: "Katia", password: "444", instrument: "flute", resume: "link.com", photo: "link.jpg")

t1 = Task.create(scales: "four 8vas in A major, thirds, fifths, sixths, octaves", arpeggios: "d7, four 8vas", etudes: "Sevcik Op. 8, Kreutzer #2", sight_reading: "Beethoven symphony eroica: fourth mvt", solo: "Bach Chaconne", concerto: "Brahms Concerto third mvt", excerpts: "Don Juan, Proko Classical 1st page")
t2 = Task.create(scales: "three 8vas in A major, thirds, sixths, fingered octaves", arpeggios: "third 8vas", etudes: "Cant", sight_reading: "Ravel quartet", solo: "Bach", concerto: "Dvorak Cello Concerto transposed", excerpts: "Don Juan")
t3 = Task.create(scales: "three 8vas in A major, thirds, fifths, sixths, octaves", arpeggios: "four 8vas", etudes: "n/a", sight_reading: "Mendelssohn Octet", solo: "Bach", concerto: "Schumann", excerpts: "Strauss: Don Quixote")
t4 = Task.create(scales: "E major: three octave scale", arpeggios: "four 8vas", etudes: "n/a", sight_reading: "Mozart Magic Flute", solo: "Paganini Caprice No. 24", concerto: "n/a", excerpts: "Beethoven Symphony 9: Adagio")

u1 = UserTask.create({user: marc, task: t1})
u2 = UserTask.create({user: ulysses, task: t2})
u3 = UserTask.create({user: sisley, task: t3})
u4 = UserTask.create({user: katia, task: t4})

n1 = TaskNote.create({user_task: u1, objectives: "asdf", progress_report: "2/5", takeaway: "I learned blah blah blah"})
n2 = TaskNote.create({user_task: u2, objectives: "nvkxn", progress_report: "3/5", takeaway: "subdivide continuously, listen to soprano line and support"})
n3 = TaskNote.create({user_task: u3, objectives: "asdf", progress_report: "4/5", takeaway: "be aware of bowstroke consistency"})
n4 = TaskNote.create({user_task: u4, objectives: "get up to quarter note = 100", progress_report: "4/5", takeaway: "frequent breaks, intensify focus"})

s1 = SubTask.create({tempo: "quarter note = 130", rhythm: "Adagio", articulation: "legato", dynamics: "mezzo forte", phrasing: "four-bar phrasing", style: "lyrical, sotto voce", intonation: "drone A", task: t1})
s2 = SubTask.create({tempo: "eighth note = 150", rhythm: "faster", articulation: "legato", dynamics: "forte", phrasing: "four-bar phrasing", style: "buoyant, sotto voce", intonation: "drone B4", task: t2})
s3 = SubTask.create({tempo: "quarter note = 130", rhythm: "Allegro ma non troppo", articulation: "n/a", dynamics: "mezzo forte", phrasing: "three-bar phrasing", style: "lyrical, sotto voce", intonation: "drone A", task: t3})
s4 = SubTask.create({tempo: "quarter note = 130", rhythm: "Adagio", articulation: "legato", dynamics: "varied", phrasing: "four-bar phrasing", style: "graceful, elegant", intonation: "match B-flat clarinet", task: t4})

m1 = Media.create({name: "La Phil audition run-through", url: "youtubelink.com", user: marc})
m2 = Media.create({name: "Berlin Philharmonic section viola audition run-through", url: "youtubelink.com", user: ulysses})
m3 = Media.create({name: "Chicago Symphony audition run-through", url: "youtubelink.com", user: sisley})
m4 = Media.create({name: "Boston Symphony principal audition run-through", url: "youtubelink.com", user: katia})

c1 = Comment.create({feedback: "overall: dynamic contrasts can be more exaggerated, prok: articulations are all correct but animate the carroted notes denoting Proko's spin on 'classical' style", media: m1, user: ulysses})
c2 = Comment.create({feedback: "overall: dynamic contrasts can be more exaggerated, prok: articulations are all correct but animate the carroted notes denoting Proko's spin on 'classical' style", media: m1, user: sisley})
c3 = Comment.create({feedback: "overall: dynamic contrasts can be more exaggerated, prok: articulations are all correct but animate the carroted notes denoting Proko's spin on 'classical' style", media: m2, user: katia})
c4 = Comment.create({feedback: "overall: dynamic contrasts can be more exaggerated, prok: articulations are all correct but animate the carroted notes denoting Proko's spin on 'classical' style", media: m2, user: marc})
c5 = Comment.create({feedback: "overall: dynamic contrasts can be more exaggerated, prok: articulations are all correct but animate the carroted notes denoting Proko's spin on 'classical' style", media: m3, user: ulysses})

puts "Seeds Done."
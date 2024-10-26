from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from wallstreet.models import Selection, Option, Result
from wallstreet.tasks import addOptions, endWeek, startWeek
from wallstreet.helperFunctions import getSunday

class SelectionCreateTest(APITestCase):
    def setUp(self):
        self.sunday = getSunday(0)
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_celery(self):
        addOptions(sunday=self.sunday)
        options = Option.objects.filter(sunday=self.sunday, benchmark=False)
        self.assertEqual(10, options.count())
        choices = 3
        for option in options:
            if choices > 0:
                Selection.objects.create(option=option, user=self.user)
                choices = choices - 1
        self.assertEqual(3, Selection.objects.filter(user=self.user).count())

        startWeek(sunday=self.sunday)
        optionBenchmarks = Option.objects.filter(sunday=self.sunday, benchmark=True)
        self.assertEqual(3, optionBenchmarks.count())
        
        endWeek(sunday=self.sunday)
        optionBenchmarks = Option.objects.filter(sunday=self.sunday, benchmark=True)
        self.assertEqual(4, optionBenchmarks.count())
        userWeeklyResults = Result.objects.filter(sunday=self.sunday, user=self.user)
        self.assertEqual(1, userWeeklyResults.count())
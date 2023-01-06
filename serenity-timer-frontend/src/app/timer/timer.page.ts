import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RangeValue } from '@ionic/core';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent =
    {} as CountdownComponent;

  public timerRangeValue: RangeValue = { lower: 1, upper: 60 };

  public formGroup: FormGroup = new FormGroup({});

  public isTimerStart = false;

  public config: CountdownConfig = {
    leftTime: 0,
  };

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      countdownTime: [0],
      countdownPickedTime: [1],
    });
  }

  public toggleTimer(): void {
    this.config = {
      ...this.config,
      leftTime: this.formGroup.get('countdownTime')?.value,
    };

    if (this.isTimerStart) {
      this.countdown.begin();
    }
    this.isTimerStart = !this.isTimerStart;
  }

  toControl(value: any): FormControl<typeof value['value']> {
    return value as FormControl<typeof value['value']>;
  }
}

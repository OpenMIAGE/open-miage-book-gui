<div id="div_alert" class="row-fluid"> 
    {if $alert}     
        <div class="alert {$alert_type} alert-block span4 offset4">
            <button type="button" class="close" data-dismiss="alert">x</button>
        {if $alert_title}<h4>{$alert_title}</h4>{/if}
            {$alert}
        </div>    
    {/if}
</div>